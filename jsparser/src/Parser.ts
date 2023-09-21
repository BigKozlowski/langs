import { Tokenizer } from "./Tokenizer";

interface IParser {
    _tokenizer: Tokenizer,
}

export class Parser {
    _string: string | null = null;
    _tokenizer: Tokenizer | null = null;
    _lookahead: astNode | null = null;

    constructor () {
        this._tokenizer = new Tokenizer();
    }

    parse(string: string) {
        if(this._tokenizer === null){
            throw new Error("tokenizer is not initialized");
        }

        this._string = string;
        this._tokenizer.init(string);

        this._lookahead = this._tokenizer.getNextToken();

        return this.Program();
    }

    Program() {
        return {
            type: "Program",
            body: this.Literal(),
        }
    }

    Literal() {
        if(this._lookahead === null) {
            throw new Error("lookahead is not initialized");
        }
        switch (this._lookahead.type) {
            case 'NUMBER': 
                return this.NumericLiteral();
            case 'STRING': 
                return this.StringLiteral();
        }
        throw new SyntaxError(`Literal: unexpected literal production`);
    }

    StringLiteral() {
        const token = this._eat('STRING');
        return {
            type: 'StringLiteral',
            value: token.value.slice(1, -1),
        }
    }

    NumericLiteral() {
        const token = this._eat('NUMBER')
        return {
            type: 'NumericLiteral',
            value: Number(token.value)
        }
    }

    _eat(tokenType: string): astNode {
        if(this._lookahead === null){
            throw new Error("lookahead is not initialized");
        }
        if(this._tokenizer === null) {
            throw new Error("tokenizer is not initialezed");
        }
        const token = this._lookahead;

        if(token === null) {
            throw new SyntaxError(`Unexpected end of input, expected: "${tokenType}"`)
        }

        if(token.type !== tokenType){
            throw new SyntaxError(`Unexpected token: "${token.value}", expected "${tokenType}"`);
        }

        this._lookahead = this._tokenizer.getNextToken();

        return token;
    }
}