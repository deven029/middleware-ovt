      /*以下是控件对外提供的方法*/

      function public_getHour() {
        if(addconf_form.hour.value == "") {
          return 0;
        }
        return parseFloat(addconf_form.hour.value);
      }

      function public_setHour(hourStr) {
        var value;
        try {
          var value = parseFloat(hourStr);
          if(value > 23 || value < 0) {
            value = "00";
          }
          else if(value < 9) {
            value = "0" + value;
          }
          else if(value > 9 && value < 24){
          }
          else {
            value = "00";
          }
        }
        catch(e) {
          value = "00";
        }
        addconf_form.hour.value = value;
      }

      function public_getMinute() {
        if(addconf_form.minute.value == "") {
          return 0;
        }
        return parseFloat(addconf_form.minute.value);
      }

      function public_setMinute(minuteStr) {
        var value;
        try {
          var value = parseFloat(minuteStr);
          if(value > 59 || value < 0) {
            value = "00";
          }
          else if(value < 9) {
            value = "0" + value;
          }
          else if(value > 9 && value < 59){
          }
          else {
            value = "00";
          }
        }
        catch(e) {
          value = "00";
        }
        addconf_form.minute.value = value;
      }



      function public_getSecond() {
        if(addconf_form.second.value == "") {
          return 0;
        }
        return parseFloat(addconf_form.second.value);
      }

      function public_setSecond(secondStr) {
        var value;
        try {
          var value = parseFloat(secondStr);
          if(value > 59 || value < 0) {
            value = "00";
          }
          else if(value < 9) {
            value = "0" + value;
          }
          else if(value > 9 && value < 59){
          }
          else {
            value = "00";
          }
        }
        catch(e) {
          value = "00";
        }
        addconf_form.second.value = value;
      }


      function public_getTime() {
        var hourStr = addconf_form  .hour.value;
        var minuteStr = addconf_form.minute.value;
        var secondStr = addconf_form.second.value;
        if(hourStr == "") {
          hourStr = "00";
        }
        if(minuteStr == "") {
          minuteStr = "00";
        }
        if(secondStr == "") {
          secondStr = "00";
        }
        return hourStr + ":" + minuteStr + ":" + secondStr;
      }


      function public_setTime(timeStr) {
        try {
          public_setHour(timeStr.substring(0,2));
          public_setMinute(timeStr.substring(3,5));
          public_setSecond(timeStr.substring(6,8));
        }
        catch(e) {
          addconf_form.hour.value = "00";
          addconf_form.minute.value = "00";
          addconf_form.second.value = "00";
        }
      }


      /*以下是控件内部使用的函数*/
      var currInput = -1;

      function init() {
        addconf_form.hour.value = "<%=hour%>";
        addconf_form.minute.value = "<%=minute%>";
        addconf_form.second.value = "<%=second%>";
      }

      function fnHandleUp() {
        switch(currInput.name) {
          case "hour":
            currInput.select();
            var value = currInput.value;
            if(value.charAt(0) == '0') {
              value = parseInt(value.charAt(1));
            }
            else {
              value = parseInt(value);
            }
            if(value == 23 ) {
              currInput.value = "00";
              return;
            }
            value = value + 1;
            if(value <= 9) {
              value = "0" + value;
            }
            currInput.value = value;
            return;
          case "minute":
          case "second":
            currInput.select();
            var value = currInput.value;
            if(value.charAt(0) == '0') {
              value = parseInt(value.charAt(1));
            }
            else {
              value = parseInt(value);
            }
            if(value == 59 ) {
              currInput.value = "00";
              return;
            }
            value = value + 1;
            if(value <= 9) {
              value = "0" + value;
            }
            currInput.value = value;
            return;
        }
      }

      function fnHandleDown() {
        switch(currInput.name) {

          case "hour":
            currInput.select();
            var value = currInput.value;
            if(value.charAt(0) == '0') {
              value = parseInt(value.charAt(1));
            }
            else {
              value = parseInt(value);
            }
            if(value == 0 ) {
              currInput.value = "23";
              return;
            }
            value = value - 1;
            if(value <= 9) {
              value = "0" + value;
            }
            currInput.value = value;
            return;
          case 1:
          case 2:
            currInput.select();
            var value = currInput.value;
            if(value.charAt(0) == '0') {
              value = parseInt(value.charAt(1));
            }
            else {
              value = parseInt(value);
            }
            if(value == 0 ) {
              currInput.value = "59";
              return;
            }
            value = value - 1;
            if(value <= 9) {
              value = "0" + value;
            }
            currInput.value = value;
            return;
        }
      }

      function fnHandleFoucs(obj) {
        obj.select();
        currInput = obj;
      }

      function fnHandleBlur(obj) {
        obj.value = obj.value;
        if(obj.value == "") {
          obj.value = "00";
        }
        switch(obj.name) {
          case "hour":
            var value = obj.value;
            if (parseFloat(value) < 0 || parseFloat(value) > 23) {
                    obj.value = "00";
                    obj.select();
                    return false;
            }
            if (value.length < 2 && obj.value != "")
                    obj.value = "0" + obj.value;
            return;
          case "minute":
          case "second":
            var value = obj.value;
            if (parseFloat(value) < 0 || parseFloat(value) > 59) {
                    obj.value = "00";
                    obj.select();
                    return false;
            }
            if (value.length < 2 && obj.value != "")
                    obj.value = "0" + obj.value;
            return;
        }

        //currInput = -1;
      }

      function fnHandleOnKeyPress() {
        if(event.keyCode >= 48 && event.keyCode <= 57)
          return true;
        else
          return false;
      }
