<!--                
				/**
					返回页面所有指定类型控件,getAllControl函数是唯一对外接口，其余函数均为它服务
					_conrolTypeName="text"  所有【文本】控件，不包含【hidden】控件和【textarea】控件
					_conrolTypeName="textarea"  所有【textarea】控件，不包含【hidden】控件和【文本】控件
					_conrolTypeName="text_textarea"  所有【textarea】控件和【文本】控件，不包含【hidden】控件
				*/
					function getAllControl(_conrolTypeName)
					{
						//alert(document.documentElement.tagName);
						var bodyNode=document.documentElement;//取得文档根节点//document.getElementsByTagName("html")[0];
						var value=getAllControlInNode(bodyNode,_conrolTypeName);//在body节点中寻找指定类型控件
						return value;
					}
					
					//一个节点是不是文本节点
					function isTextNode(_node)
					{
						if(_node.nodeValue==null) return false;
						else return true;
					}
					
					//获取非文本节点的子节点总数
					function getNotTextSonNodeCount(_node)
					{
						var count=0;
						var len=_node.childNodes.length;//当前节点子节点总数
						for(i=0;i<len;i++)
						{
							if(isTextNode(_node.childNodes[i])==false) count++;
						}
						return count;
					}
					
					function getAllControlInNode(_node,_conrolTypeName)//在_node节点中寻找指定类型_conrolTypeName控件
					{
						var value=new Array(0);
						var point=0;//数组位置指针
						
						if(isTextNode(_node)==true) return value;//不处理纯文本节点
						
						processCurrNode(value,_node,_conrolTypeName);//处理当前节点
						var lenNotTextNode=getNotTextSonNodeCount(_node);//_node.childNodes.length;//当前节点子节点总数
						var len=_node.childNodes.length;//当前节点子节点总数

						if(lenNotTextNode>0)
						{
							for(var i=0;i<len;i++)
							{
								var currNode=_node.childNodes[i];//当前节点
								if(isTextNode(currNode)==true) continue;//不处理文本节点
								
								var array=getAllControlInNode(currNode,_conrolTypeName);
								
								addNode2Array(value,array);
							}
						}
						return value;
        			}
					
					//如果当前节点符合要求，加入数组中
					function processCurrNode(value,currNode,_conrolTypeName)
					{
						var typeNames=_conrolTypeName.split("_");//分解用"_"分开的多种类型
						var typeCount=typeNames.length;
						for(var i=0;i<typeCount;i++)//分别处理每种控件类型
						{
							processCurrNodeForEveryControlType(value,currNode,typeNames[i]);
						}
					}
					
					/**
						分别处理每种控件类型
					*/
					function processCurrNodeForEveryControlType(value,currNode,_conrolTypeName)
					{
						//if(_conrolTypeName.toLowerCase()=="text" || _conrolTypeName.toLowerCase()=="checkbox" 
						//   || _conrolTypeName.toLowerCase()=="radio" || _conrolTypeName.toLowerCase()=="button" )//如果要找text控件或者checkbox控件或者radio控件或者button控件
						var nodeTagName=currNode.tagName;//当前节点的TagName
						if(nodeTagName.toUpperCase()=="INPUT")//如果当前节点是以“<INPUT ”开头
						{
							//var nodeTagName=currNode.tagName;//当前节点的TagName
							
							//if(nodeTagName.toUpperCase()=="INPUT")//如果当前节点是以“<INPUT ”开头
							{
								if(currNode.type==_conrolTypeName)//如果当前节点的TYPE等于要找的TYPE
								{
									value[value.length]=currNode;
								}
							}
						}
						if(_conrolTypeName.toLowerCase()=="textarea")//如果要找textarea控件
						{
							var nodeTagName=currNode.tagName;
							
							if(nodeTagName.toUpperCase()=="TEXTAREA")
							{
									value[value.length]=currNode;
							}
						}
						if(_conrolTypeName.toLowerCase()=="span")//如果要找span控件
						{
							var nodeTagName=currNode.tagName;
							
							if(nodeTagName.toUpperCase()=="SPAN")
							{
									value[value.length]=currNode;
							}
						}

					}
					
					//将_subArray数组中的全部元素添加到_sourceArray中
					function addNode2Array(_sourceArray,_subArray)
					{
						var len=_subArray.length;
						for(i=0;i<len;i++)
						{
							_sourceArray[_sourceArray.length]=_subArray[i];
						}
					}

					

//-->					