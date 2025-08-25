import { isLowerThan, max } from "#bussiness/calculator.bussiness.js";
import { sign } from 'jsonwebtoken';
export const add = (a, b) => {
    const result = a + b;

    if (result < max) {
        isLowerThan(result, max);
        const token = sign(result, 'my-secret');
        console.log({ token });
    }

    return result;
}
