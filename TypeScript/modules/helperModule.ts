module hashApp.helper {

    /**
     * Check whether el has given class or hasn't
     * @param className
     * @param el
     * @returns {boolean}
     */
    export function hasClass( className: string, el: any ):boolean {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }

    /**
     * Add class to the element
     * Notice, function is not checking whether given className exists on element or not
     * @param className
     * @param el
     * @returns {HTMLBaseElement}
     */
    export function addClass( className: string, el: any ): HTMLBaseElement {
        el.className = el.className.trim() + ' ' + className;
        return el;
    }

    /**
     * Remove class from the element
     * @param className
     * @param el
     * @returns {HTMLBaseElement}
     */
    export function removeClass( className: string, el: any ): HTMLBaseElement {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), '');
        return el;
    }

    /**
     * Toggle class name
     * @param className
     * @param el
     * @param callback
     * @returns {HTMLBaseElement}
     */
    export function toggleClass( className: string, el: HTMLBaseElement, callback?: ( event ) => any ): HTMLBaseElement {
        if ( helper.hasClass( className, el ) ) {
            helper.removeClass( className, el );
            if ( isFunction( callback ) ) callback( { tAction: 'removed' } )
        } else {
            helper.addClass( className, el );
            if ( isFunction( callback ) ) callback( { tAction: 'added' } )
        }
        return el;
    }

    /**
     * Check whether given variable is function or not
     * @param functionToCheck
     * @returns {boolean}
     */
    export function isFunction( functionToCheck: any ) {
        var getType = {};
        return functionToCheck && ( <any> getType.toString ).call(functionToCheck) === '[object Function]';
    }

    /**
     * Create array with unique values from given one
     * @param arr
     * @returns {Array}
     */
    export function arrUnique( arr ) {
        var a = [];
        for ( var i = 0; i < arr.length; i++ ) {
            var current = arr[i];
            if (a.indexOf(current) < 0) a.push(current);
        }

        return a;
    }

    /**
     * Search for a specified value within an array
     * @param value
     * @param arr {Array}
     * @return {boolean}
     */
    export function inArray( value: any, arr: any ) {

        // Notice that following will work only in IE9 and above
        return arr.indexOf( value ) > -1;
    }

    /**
     *
     * @param email
     * @returns {boolean}
     */
    export  function isValidEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    /**
     * Set cookie
     * @param name
     * @param value
     * @param expire_days
     */
    export function setCookie( name:string, value:string, expire_days:number ) {
        var d = new Date();
        d.setTime(d.getTime() + (expire_days*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = name + "=" + value + "; " + expires;
    }

    /**
     * Return cookie
     * @param name
     * @returns {string || boolean}
     */
    export function getCookie( name:string ) {
        var _name = name + "=";
        var ca = document.cookie.split(';');
        var result:any = false;
        for( var i=0; i<ca.length; i++ ) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(_name) == 0) result = c.substring(_name.length,c.length);
        }
        return result;
    }
}