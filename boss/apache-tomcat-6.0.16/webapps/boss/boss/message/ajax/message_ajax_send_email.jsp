<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="java.io.*,java.sql.*,java.util.*"%>
<%@page import="com.ovt.idtv.boss.core.service.message.*,com.ovt.idtv.boss.core.service.message.model.*,com.ovt.idtv.boss.core.*,com.ovt.idtv.boss.core.service.digi_tv.model.*,com.ovt.idtv.web.plugin.*"%>
<%@page import="com.ovt.idtv.boss.core.Boss,com.ovt.idtv.boss.core.service.digi_tv.*,com.ovt.idtv.web.plugin.*"%>

<%
	response.setContentType("text/xml");
	response.setHeader("Cache-Control", "no-cache");

	String ids = (String)request.getParameter("ids");
	String oper = (String)request.getParameter("oper");
	
	IEmailService emailService = Boss.getMessageService().getEmailService();   
	//IDigiTvService digiTvService = Boss.getDigiTvService();
	
	
	MessageService_Service service = new MessageService_Service() ;
	
	String result = "";
	BossEmailForm bossEmail = null;
	List<BossEmailForm> resultList = null;
	
	String rids = "";
	String currentDateString = "";
	try{
		if(null != ids && !ids.equals("")){
			try {
				resultList = emailService.findEmails(ids , 0 , null);
			} catch (BossOperException e) {
				e.printStackTrace();
			}
			
			java.util.Date currentDate = new java.util.Date();
			
			java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			currentDateString = format.format(currentDate);
			
			if(resultList.size() >= 1){
				for(int i=0; i< resultList.size(); i++){
					bossEmail = resultList.get(i);
					bossEmail.setPublicDate(currentDate);
					bossEmail.setOperDate(currentDate);
					
					emailService.saveOrUpdateEmail(bossEmail);
					
					if(bossEmail.getEmailType() == 0){
						SendEmailRequest emailRequest = new SendEmailRequest();
						
						emailRequest.setCardNumber(bossEmail.getEquNo());
						emailRequest.setEmailAuthor(bossEmail.getAuthor());
						emailRequest.setEmailContent(bossEmail.getText());
						emailRequest.setEmailTitle(bossEmail.getTitle());
						emailRequest.setExpiredDays(Integer.parseInt(bossEmail.getOverdueDate() + ""));
						emailRequest.setCaFlag(bossEmail.getCaFlag());//算通卡不够16位，增加设备厂家信息 2012-5-18 yzy
						
						service.getMessageServicePort().sendEmail(emailRequest);
					}else {
						ConditionAddressRequest conditionRequest = new ConditionAddressRequest();
						
						List<Integer> aredIdsList = new ArrayList<Integer>();
						aredIdsList.add(Integer.parseInt("" + bossEmail.getAreaId()));
						Condition condition = new Condition();
						condition.setAreaIds(aredIdsList);
						
						EmailModel emailModel = new EmailModel();
						emailModel.setEmailAhthor(bossEmail.getAuthor());
						emailModel.setEmailContent(bossEmail.getText());
						emailModel.setEmailTitle(bossEmail.getTitle());
						emailModel.setImportance("1");
						
						conditionRequest.setExpiredDays(3);              
						conditionRequest.setCondition(condition);
						conditionRequest.setEmailModel(emailModel);
						
						service.getMessageServicePort().conditionAddress(conditionRequest);
					}
				}
				
				result = currentDateString;
				
			}else{
				result = "fail";
			}
		}else{
			result = "fail";
		}
	}catch(RuntimeException re)
	{
		re.printStackTrace();
		result = "fail";
	}

	PrintWriter pw = response.getWriter();
	pw.print("<obj><result>" + result + "</result></obj>");

%>