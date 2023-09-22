const testLiteral = (test: (arg0: string, arg1: { type: string; body: { type: string; value: number; } | { type: string; value: string; } | { type: string; value: string; }; }) => void) => {
    test('42', {
        type: "Program",
        body: {
            type: "NumericLiteral",
            value: 42,
        },
    });

    test('"hello"', {
        type: "Program",
        body: {
            type: "StringLiteral",
            value: 'hello',
        },
    });

    test(`'hello'`, {
        type: "Program",
        body: {
            type: "StringLiteral",
            value: 'hello',
        },
    });
};

export default testLiteral;