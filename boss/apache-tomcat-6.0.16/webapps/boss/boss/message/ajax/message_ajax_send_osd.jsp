<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="java.io.*,java.sql.*,java.util.*"%>
<%@page import="com.ovt.idtv.boss.core.service.message.*,com.ovt.idtv.boss.core.service.message.model.*,com.ovt.idtv.boss.core.*,com.ovt.idtv.boss.core.service.digi_tv.model.*,com.ovt.idtv.web.plugin.*"%>
<%@page import="com.ovt.idtv.boss.core.Boss,com.ovt.idtv.boss.core.service.digi_tv.*,com.ovt.idtv.web.plugin.*"%>
<%@ page import="org.apache.log4j.Logger" %>

<%
	response.setContentType("text/xml");
	response.setHeader("Cache-Control", "no-cache");
	
	Logger logger = Logger.getLogger(this.getClass());

	String ids = (String)request.getParameter("ids");
	String oper = (String)request.getParameter("oper");
	
	IOSDService osdService = Boss.getMessageService().getOSDService();   
	MessageService_Service service = new MessageService_Service() ;
	
	String result = "";
	BossOsdForm bossOsd = null;
	List<BossOsdForm> resultList = null;
	
	String rids = "";
	String currentDateString = "";
	try{
		if(null != ids && !ids.equals("")){
			try {
				resultList = osdService.findOSDs(ids , 0 , null);
			} catch (BossOperException e) {
				e.printStackTrace();
			}
			
			java.util.Date currentDate = new java.util.Date();
			
			java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			currentDateString = format.format(currentDate);
			
			if(resultList.size() >= 1){
				for(int i=0; i< resultList.size(); i++){
					bossOsd = resultList.get(i);
					bossOsd.setPublicDate(currentDate);
					bossOsd.setOperDate(currentDate);
					
					osdService.saveOrUpdateOSD(bossOsd);
					
					if(bossOsd.getOsdType() == 0){
						SendOSDRequest osdRequest = new SendOSDRequest();
						
						osdRequest.setCardNumber(bossOsd.getEquNo());
						osdRequest.setOsdContent(bossOsd.getText());
						osdRequest.setExpiredDays(Integer.parseInt(bossOsd.getOverdueDate() + ""));
						osdRequest.setPriority(3);  
						osdRequest.setShowTimeLength(Integer.parseInt("" + bossOsd.getOsdDuration() ) ); 
						osdRequest.setShowTimes(1);
						osdRequest.setOsdPosition("" + bossOsd.getOsdStyle());
						osdRequest.setCaFlag(bossOsd.getCaFlag());//厂家标志 2012-5-18 yzy
						
						service.getMessageServicePort().sendOSD(osdRequest);
					}else {
						ConditionAddressRequest conditionRequest = new ConditionAddressRequest();
						List<Integer> aredIdsList = new ArrayList<Integer>();
						
						//根据指定片区得到其下所有的孩子结点片区
						if(bossOsd.getAreaId() != null){
							aredIdsList.add(Integer.parseInt("" + bossOsd.getAreaId()));
						
							Condition condition = new Condition();
							condition.setAreaIds(aredIdsList);
							
							OsdModel osdModel = new OsdModel();
							osdModel.setOsdContent(bossOsd.getText());
							osdModel.setPriority(3);
							osdModel.setShowTimeLength( Integer.parseInt("" + bossOsd.getOsdDuration() ) );
							osdModel.setShowTimes(1);
							osdModel.setStyle(bossOsd.getOsdStyle() + "");
							
							conditionRequest.setExpiredDays(3);             //群发OSD过期时间
							conditionRequest.setCondition(condition);
							conditionRequest.setOsdModel(osdModel);
							
							service.getMessageServicePort().conditionAddress(conditionRequest);
						}else{
							logger.info("主键为 " + bossOsd.getIcId() + " 的OSD不存在片区号！");
						}
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