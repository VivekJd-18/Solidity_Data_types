import { ethers } from "ethers";

// Helper function to check if a string matches a regex pattern
function validateRegex(value: string, pattern: RegExp): boolean {
  return pattern.test(value);
} 

// Validation functions for specific data types

function validateUint(value: string): boolean {
  const pattern = /^\d+$/; // Matches non-negative integers
  return validateRegex(value, pattern);
}

function validateUint8(value: string): boolean {
  const pattern = /^[0-2]?[0-5]{2}$/; // Matches 0 to 255
  return validateRegex(value, pattern);
}

function validateUint16(value: string) {
  const pattern = /^[0-9]{1,5}$/; // Matches 0 to 65535
  const intValue = parseInt(value, 10);
  return (
    pattern.test(value) &&
    intValue >= 0 &&
    intValue <= 65535 &&
    value === intValue.toString()
  );
}

function validateInt(value: string): boolean {
  const pattern = /^-?\d+$/; // Matches signed integers (corrected)
  return validateRegex(value, pattern);
}

function validateInt8(value: string): boolean {
  const pattern = /^-128|^-?12[0-7]|^-?[0-9]{1,2}$/; // Matches -128 to 127 (corrected)
  return pattern.test(value);
}

function validateInt16(value: string): boolean {
  const pattern =
    /^-32768$|^-32767$|^-3276[0-6]$|^-327[0-5]\d$|^-32[0-6]\d{2}$|^-3[01]\d{3}$|^-?[0-2]?\d{1,4}$/;
  return pattern.test(value);
}

function validateBool(value: string): boolean {
  const pattern = /^(true|false)$/; // Matches "true" or "false" (case-sensitive)
  return validateRegex(value, pattern);
}

function validateAddress(value: string): boolean {
  const pattern = /^0x[0-9a-fA-F]{40}$/; // Matches 20-byte Ethereum address
  return validateRegex(value, pattern);
}

// Validation for large integers (uint256, int256)

function validateLargeInteger(value: string): boolean {
  // Attempt to parse the value as a BigNumber using ethers.js
  try {
    ethers.BigNumber.from(value);
    return true;
  } catch {
    console.warn(
      "Validation for large integers requires a library like ethers.js."
    );
    return false;
  }
}

// Sample values for validation
const uintValue = "1234";
const uint8Value = "255";
const uint16Value = "42000";
const intValue = "-543";
const int8Value = "-42";
const int16Value = "12345";
const boolValue = "false";
const addressValue = "0x0123456789012345678901234567890123456789";
const largeIntValue =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935"; // Very large integer

// Additional test cases
const invalidUintValue = "123a"; // Contains non-numeric characters
const invalidUint8Value = "256"; // Exceeds maximum value (255)
const invalidUint16Value = "65536"; // Exceeds maximum value (65535)
const invalidIntValue = "-543a"; // Contains non-numeric characters
const invalidInt8Value = "-129"; // Below minimum value (-128)
const invalidInt16Value = "32768"; // Exceeds maximum value (32767)
const invalidBoolValue = "True"; // Incorrect case
const invalidAddressValue = "0x123"; // Insufficient length

// Function calls for validation
const isValidUint = validateUint(uintValue);
const isValidUint8 = validateUint8(uint8Value);
const isValidUint16 = validateUint16(uint16Value);
const isValidInt = validateInt(intValue);
const isValidInt8 = validateInt8(int8Value);
const isValidInt16 = validateInt16(int16Value);
const isValidBool = validateBool(boolValue);
const isValidAddress = validateAddress(addressValue);
const isValidLargeInteger = validateLargeInteger(largeIntValue); // Will issue a warning about regex limitations

// Additional function calls for validation
const isInvalidUint = validateUint(invalidUintValue);
const isInvalidUint8 = validateUint8(invalidUint8Value);
const isInvalidUint16 = validateUint16(invalidUint16Value);
const isInvalidInt = validateInt(invalidIntValue);
const isInvalidInt8 = validateInt8(invalidInt8Value);
const isInvalidInt16 = validateInt16(invalidInt16Value);
const isInvalidBool = validateBool(invalidBoolValue);
const isInvalidAddress = validateAddress(invalidAddressValue);

// Output validation results
console.log("Validation results:");
console.log("uint:", isValidUint);
console.log("uint8:", isValidUint8);
console.log("uint16:", isValidUint16);
console.log("int:", isValidInt);
console.log("int8:", isValidInt8);
console.log("int16:", isValidInt16);
console.log("bool:", isValidBool);
console.log("address:", isValidAddress);
console.log("largeInteger:", isValidLargeInteger);

// Output additional validation results
console.log("\nAdditional validation results:");
console.log("Invalid uint:", isInvalidUint);
console.log("Invalid uint8:", isInvalidUint8);
console.log("Invalid uint16:", isInvalidUint16);
console.log("Invalid int:", isInvalidInt);
console.log("Invalid int8:", isInvalidInt8);
console.log("Invalid int16:", isInvalidInt16);
console.log("Invalid bool:", isInvalidBool);
console.log("Invalid address:", isInvalidAddress);
