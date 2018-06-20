<!--

	function user(_name,_sex)
	{
		this.init=init;
		this.init();
		this.setName(_name);
		this.setSex(_sex);
	}

	function user()
	{
		this.init=init;
		this.init();
	}


	function init()
	{
		this.setID=setID;
		this.getID=getID;
		this.setName=setName;
		this.getName=getName;
		this.setSex=setSex;
		this.getSex=getSex;
		this.toString=toString;
		this.setName("");
		this.setSex("");
		this.setID("");
	}

	function setID(_id)
	{
		this.id=_id;
	}

	function getID()
	{
		return this.id;
	}

	function setName(_name)
	{
		this.name=_name;
	}

	function getName()
	{
		return this.name;
	}

	function setSex(_sex)
	{
		this.sex=_sex;
	}

	function getSex()
	{
		return this.sex;
	}

	
	function toString()
	{
		var v="";
		v+="\nname:"+this.name;
		v+="\nsex:"+this.sex;
		return v;
	}
//-->