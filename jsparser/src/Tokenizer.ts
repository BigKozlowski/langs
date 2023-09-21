const Spec: [RegExp, string | null][] = [
    [/^\s+/, null],
    [/^\d+/, "NUMBER"],
    [/^"[^"]*"/, "STRING"],
    [/^'[^']*'/, "STRING"]
]

export class Tokenizer {
    _string = "";
    _cursor = 0;
    init(string: string) {
        this._string = string;
        this._cursor = 0;
    }

    hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    isEOF() {
        return this._cursor == this._string.length;
    }

    getNextToken(): astNode | null {
        if(!this.hasMoreTokens()){
            return null;
        }

        const string = this._string.slice(this._cursor);

        for(const [regex, tokenType] of Spec){
            const tokenValue = this._match(regex, string);

            if(tokenValue === null){
                continue;
            }

            if(tokenType === null) {
                this._cursor+= tokenValue.length;
                return this.getNextToken();
            }

            return {
                type: tokenType,
                value: tokenValue
            }
        }

        return null;
    }

    _match(regexp: RegExp, string: string) {
        const matched = regexp.exec(string);
        if(matched == null) {
            return null;
        }

        return matched[0];
    }
}