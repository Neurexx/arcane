// const { Keypair } = require("@solana/web3.js");
import { Keypair } from "@solana/web3.js";
//const nacl = require('tweetnacl');
import nacl from 'tweetnacl';

export const generateKeypair = async () => {
    const keypair = Keypair.generate();
    return {
        publicKey: keypair.publicKey.toBytes(),
        encryptedPrivateKey: keypair.secretKey
    };
};

export const verifySignature = async (message, signature, publicKey) => {
    return nacl.sign.detached.verify(
        message,
        signature,
        publicKey
    );
};
