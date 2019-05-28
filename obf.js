var Obf = {

    random_salt: '',


    call: function(code) {
        this.salt_gen();

        let base_code = this.preInit(code);
        base_code = this.saltIterator(base_code, 2);
        base_code = this.execFork(base_code);
        return base_code;
    },

    salt_gen: function() {
        let i = 12;
        let rnd = '';
        while (rnd.length < i) {
            rnd += Math.random().toString(36).substring(2);
        }
        this.random_salt = rnd.substring(0, i);
    },

    preInit: function(code) {
        code = btoa(btoa(code));
        return code;
    },

    saltIterator: function(code, iteration) {
        let collisions = [];
        for (let i = 0; i < iteration; i++) {
            let rand = randomInteger(0, code.length - 1);
            if (!this.mapCollisions(collisions, rand)) {
                code = insert(code, "=" + this.random_salt + "]", rand);
                collisions.push(rand);
            }
        }

        function randomInteger(min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1)
            rand = Math.round(rand);
            return rand;
        }

        function insert(str, substr, pos) {
            var array = str.split('');
            array.splice(pos, 0, substr);
            return array.join('');
        }
        return btoa(code);
    },

    execFork: function(code) {
        let fork_salt = btoa(btoa(this.random_salt));
        return `var _0x3718=['` + fork_salt + `'];(function(_0x4db8b5,_0x36b5a2){var _0x5c5424=function(_0x5dc3b1){while(--_0x5dc3b1){_0x4db8b5['push'](_0x4db8b5['shift']());}};_0x5c5424(++_0x36b5a2);}(_0x3718,0x1a8));var _0x2694=function(_0x38a514,_0x1e87ce){_0x38a514=_0x38a514-0x0;var _0x2cffa7=_0x3718[_0x38a514];return _0x2cffa7;};(function(_0x1456d8,_0x4bca51,_0x4b23e9){if(_0x1456d8!==0x309){return;}_0x4bca51=atob(_0x4bca51);_0x4b23e9=atob(atob(_0x4b23e9));_0x4bca51=_0x4bca51['replace'](new RegExp('='+_0x4b23e9+']','g'),'');eval(atob(atob(_0x4bca51)));}(0x309,'` + code + `',_0x2694('0x0')));`;
    },

    mapCollisions: function(binary, bin) {
        let length = this.random_salt.length;
        for (let i = 0; i < binary.length; i++) {
            let col = binary[i];
            if (col - (length + 1) < bin) {
                return true;
            }
        }
        return false;
    }

};

module.exports = Obf;