<!--                
				/**
					����ҳ������ָ�����Ϳؼ�,getAllControl������Ψһ����ӿڣ����ຯ����Ϊ������
					_conrolTypeName="text"  ���С��ı����ؼ�����������hidden���ؼ��͡�textarea���ؼ�
					_conrolTypeName="textarea"  ���С�textarea���ؼ�����������hidden���ؼ��͡��ı����ؼ�
					_conrolTypeName="text_textarea"  ���С�textarea���ؼ��͡��ı����ؼ�����������hidden���ؼ�
				*/
					function getAllControl(_conrolTypeName)
					{
						//alert(document.documentElement.tagName);
						var bodyNode=document.documentElement;//ȡ���ĵ����ڵ�//document.getElementsByTagName("html")[0];
						var value=getAllControlInNode(bodyNode,_conrolTypeName);//��body�ڵ���Ѱ��ָ�����Ϳؼ�
						return value;
					}
					
					//һ���ڵ��ǲ����ı��ڵ�
					function isTextNode(_node)
					{
						if(_node.nodeValue==null) return false;
						else return true;
					}
					
					//��ȡ���ı��ڵ���ӽڵ�����
					function getNotTextSonNodeCount(_node)
					{
						var count=0;
						var len=_node.childNodes.length;//��ǰ�ڵ��ӽڵ�����
						for(i=0;i<len;i++)
						{
							if(isTextNode(_node.childNodes[i])==false) count++;
						}
						return count;
					}
					
					function getAllControlInNode(_node,_conrolTypeName)//��_node�ڵ���Ѱ��ָ������_conrolTypeName�ؼ�
					{
						var value=new Array(0);
						var point=0;//����λ��ָ��
						
						if(isTextNode(_node)==true) return value;//�������ı��ڵ�
						
						processCurrNode(value,_node,_conrolTypeName);//����ǰ�ڵ�
						var lenNotTextNode=getNotTextSonNodeCount(_node);//_node.childNodes.length;//��ǰ�ڵ��ӽڵ�����
						var len=_node.childNodes.length;//��ǰ�ڵ��ӽڵ�����

						if(lenNotTextNode>0)
						{
							for(var i=0;i<len;i++)
							{
								var currNode=_node.childNodes[i];//��ǰ�ڵ�
								if(isTextNode(currNode)==true) continue;//�������ı��ڵ�
								
								var array=getAllControlInNode(currNode,_conrolTypeName);
								
								addNode2Array(value,array);
							}
						}
						return value;
        			}
					
					//�����ǰ�ڵ����Ҫ�󣬼���������
					function processCurrNode(value,currNode,_conrolTypeName)
					{
						var typeNames=_conrolTypeName.split("_");//�ֽ���"_"�ֿ��Ķ�������
						var typeCount=typeNames.length;
						for(var i=0;i<typeCount;i++)//�ֱ���ÿ�ֿؼ�����
						{
							processCurrNodeForEveryControlType(value,currNode,typeNames[i]);
						}
					}
					
					/**
						�ֱ���ÿ�ֿؼ�����
					*/
					function processCurrNodeForEveryControlType(value,currNode,_conrolTypeName)
					{
						//if(_conrolTypeName.toLowerCase()=="text" || _conrolTypeName.toLowerCase()=="checkbox" 
						//   || _conrolTypeName.toLowerCase()=="radio" || _conrolTypeName.toLowerCase()=="button" )//���Ҫ��text�ؼ�����checkbox�ؼ�����radio�ؼ�����button�ؼ�
						var nodeTagName=currNode.tagName;//��ǰ�ڵ��TagName
						if(nodeTagName.toUpperCase()=="INPUT")//�����ǰ�ڵ����ԡ�<INPUT ����ͷ
						{
							//var nodeTagName=currNode.tagName;//��ǰ�ڵ��TagName
							
							//if(nodeTagName.toUpperCase()=="INPUT")//�����ǰ�ڵ����ԡ�<INPUT ����ͷ
							{
								if(currNode.type==_conrolTypeName)//�����ǰ�ڵ��TYPE����Ҫ�ҵ�TYPE
								{
									value[value.length]=currNode;
								}
							}
						}
						if(_conrolTypeName.toLowerCase()=="textarea")//���Ҫ��textarea�ؼ�
						{
							var nodeTagName=currNode.tagName;
							
							if(nodeTagName.toUpperCase()=="TEXTAREA")
							{
									value[value.length]=currNode;
							}
						}
						if(_conrolTypeName.toLowerCase()=="span")//���Ҫ��span�ؼ�
						{
							var nodeTagName=currNode.tagName;
							
							if(nodeTagName.toUpperCase()=="SPAN")
							{
									value[value.length]=currNode;
							}
						}

					}
					
					//��_subArray�����е�ȫ��Ԫ����ӵ�_sourceArray��
					function addNode2Array(_sourceArray,_subArray)
					{
						var len=_subArray.length;
						for(i=0;i<len;i++)
						{
							_sourceArray[_sourceArray.length]=_subArray[i];
						}
					}

					

//-->					