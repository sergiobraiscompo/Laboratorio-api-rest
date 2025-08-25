import * as calculator from "./calculator.js";
import * as bussiness from "./bussiness/index.js";
import * as jwt from "jsonwebtoken";
import { describe, it, expect, vi, afterEach } from 'vitest';

vi.mock('jsonwebtoken', async (importOriginal) => {
    const original: any = await importOriginal();
    return {
        ...original.default,
        __esModule: true,
    };
});

describe("Calculator specs", () => {
    describe("add", () => {
        it("should return 4 when passing A equals 2 and B equals 2", () => {
            // Arrange
            const a = 3;
            const b = 2;
            const isLowerThanFive = () => { };


            // Act
            const result = calculator.add(a, b);
            // Assert
            expect(result).toEqual(4);
            expect({ id: 1 }).toBe({ id: 1 });
            expect({ id: 1 }).toStrictEqual({ id: 1, name: undefined });
        });
        it('should call to isLowerThan when passing A equals 2 and B equals 2', () => {                // Arrange
            const a = 2;
            const b = 2;
            vi.spyOn(bussiness, 'isLowerThan').mockImplementation((result) =>
                console.log(`This is the result ${result}`)
            );
            vi.spyOn(bussiness, 'max', 'get').mockReturnValue(7);
            vi.spyOn(jwt, 'sign').mockImplementation((result) => {
                console.log(`Sign result ${result}`);
                return '';
            });
            // Assert
            expect(bussiness.isLowerThan).toHaveBeenCalled();
            expect(bussiness.isLowerThan).toHaveBeenCalledWith(4, 7);
            expect(jwt.sign).toHaveBeenCalledWith(4, 'my-secret');

        });
    });
    it('should call to original implementation isLowerThan', () => {
        // Arrange
        const a = 1;
        const b = 2;

        // Act
        const result = calculator.add(a, b);

        // Assert
        expect(result).toEqual(3);
    });
});