import { expect, test } from "vitest";

//function to be tested
const handleErrorInDiffFormats = (error: any): string=>{
    let _error;
    if (typeof error === "string") {
        _error = error;
    } else if (error instanceof Error) {
        _error = error.stack || error.message;
    } else {
        _error = String(error);
    };

    return _error
}

//tests
test('handles string error', () => {
    const result = handleErrorInDiffFormats('This is a string error');
    expect(result).toBe('This is a string error');
});

test('handles Error object with stack', () => {
    const error = new Error('This is an Error object');
    const result = handleErrorInDiffFormats(error);
    expect(result).toContain('This is an Error object');
    expect(result).toContain('Error:');
    expect(result).toContain('at ');
});

test('handles Error object without stack', () => {
    const error = new Error('This is an Error object');
    error.stack = undefined;
    const result = handleErrorInDiffFormats(error);
    expect(result).toBe('This is an Error object');
});

// test('handles number error', () => {
//     const result = handleErrorInDiffFormats(404);
//     expect(result).toBe('404');
// });

test('handles object error', () => {
    const result = handleErrorInDiffFormats({ message: 'Error object' });
    expect(result).toBe('[object Object]');
});

// test('handles null error', () => {
//     const result = handleErrorInDiffFormats(null);
//     expect(result).toBe('null');
// });

// test('handles undefined error', () => {
//     const result = handleErrorInDiffFormats(undefined);
//     expect(result).toBe('undefined');
// });

// test('handles array error', () => {
//     const result = handleErrorInDiffFormats([1, 2, 3]);
//     expect(result).toBe('1,2,3');
// });