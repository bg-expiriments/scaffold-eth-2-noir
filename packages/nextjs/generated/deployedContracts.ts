const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        VerifierLessThen: {
          address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          abi: [
            {
              inputs: [],
              name: "EC_SCALAR_MUL_FAILURE",
              type: "error",
            },
            {
              inputs: [],
              name: "MOD_EXP_FAILURE",
              type: "error",
            },
            {
              inputs: [],
              name: "PROOF_FAILURE",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "expected",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "actual",
                  type: "uint256",
                },
              ],
              name: "PUBLIC_INPUT_COUNT_INVALID",
              type: "error",
            },
            {
              inputs: [],
              name: "PUBLIC_INPUT_GE_P",
              type: "error",
            },
            {
              inputs: [],
              name: "PUBLIC_INPUT_INVALID_BN128_G1_POINT",
              type: "error",
            },
            {
              inputs: [],
              name: "getVerificationKeyHash",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "_proof",
                  type: "bytes",
                },
                {
                  internalType: "bytes32[]",
                  name: "_publicInputs",
                  type: "bytes32[]",
                },
              ],
              name: "verify",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        VerifierNotEq: {
          address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
          abi: [
            {
              inputs: [],
              name: "EC_SCALAR_MUL_FAILURE",
              type: "error",
            },
            {
              inputs: [],
              name: "MOD_EXP_FAILURE",
              type: "error",
            },
            {
              inputs: [],
              name: "PROOF_FAILURE",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "expected",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "actual",
                  type: "uint256",
                },
              ],
              name: "PUBLIC_INPUT_COUNT_INVALID",
              type: "error",
            },
            {
              inputs: [],
              name: "PUBLIC_INPUT_GE_P",
              type: "error",
            },
            {
              inputs: [],
              name: "PUBLIC_INPUT_INVALID_BN128_G1_POINT",
              type: "error",
            },
            {
              inputs: [],
              name: "getVerificationKeyHash",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "_proof",
                  type: "bytes",
                },
                {
                  internalType: "bytes32[]",
                  name: "_publicInputs",
                  type: "bytes32[]",
                },
              ],
              name: "verify",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        YourContract: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "greetingSetter",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "newGreeting",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "premium",
                  type: "bool",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "GreetingChange",
              type: "event",
            },
            {
              inputs: [],
              name: "greeting",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "premium",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_newGreeting",
                  type: "string",
                },
              ],
              name: "setGreeting",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "totalCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "userGreetingCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
