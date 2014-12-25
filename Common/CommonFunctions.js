"use-strict";
var ListHelper = {
    forEach: function (list, eachCallback) {
        for (var i = 0; i < list.length; i++) {
            eachCallback(list[i]);
        }
    },

    any: function (list, eachCallback) {
        for (var i = 0; i < list.length; i++) {
            if (eachCallback(list[i]) === true)
                return true;
        }
        return false;
    },
    indexOf: function (list, predicate) {
        for (var i = 0; i < list.length; i++) {
            if (predicate(list[i]) === true)
                return i;
        }

        return -1;
    },
    firstOfDefault : function(list, predicate)
    {
        var index = ListHelper.indexOf(list,predicate);
        if (index === -1)
            return null;
        return list[index];
    },
    where: function(list, predicate)
    {
        if (list.length === 0)
            return list;

        var retList = [];
          for (var i = 0; i < list.length; i++) {
            if (eachCallback(list[i]) === true)
                retList.push(list[i]);
        }
        return retList;
    },
    sum: function(list, projection)
    {
        var suma=0;
        for (var i = 0; i < list.length; i++) {
            suma= MoneyHelper.add(suma,projection(list[i]));
        }

        return suma;
    }
};

var Constants = {
    DPHPercent: 0.21
};

var MoneyHelper = {

    add: function (val1, val2) {
        return (val1 * 100 + val2 * 100) / 100;
    },
    sub: function (val1, val2) {
        return (val1 * 100 - val2 * 100) / 100;
    },
    multi: function (val1, val2) {
        return (val1 * 100 * val2 * 100) / 10000;
    },
    div: function (val1, val2) {
        return (val1 * 100 / val2 * 100) / 10000;
    },
    result: function (val) {
        //http://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-in-javascript
        //only for 2 d.p., 
        return Math.round((val + 0.00001) * 100) / 10000;
    },

    na2pc: function (val) {
        //http://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-in-javascript
        //only for 2 d.p., 
        return Math.round((val + 0.00001) * 100) / 100;
    },
    na2pcFixed : function(val){
        return MoneyHelper.na2pc(val).toFixed(2);
    },

    // na dvě desetiny
    formatProcenta: function (val) {
        var newVal = MoneyHelper.div(val, 100);
        //chcu na dvě desetiny proto násobím 100 a pak to podělím
        var procento = (val + 0.00001) * 100;
        var kompletniVysledek = Math.round(procento * 100) / 100;
        return kompletniVysledek;

    },
    format: function (val) {
        var n = val,
            c = 2,
            d = ".",
            t = ",",
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }
};
