---
sidebar_position: 4
---

# Architecture

## System Overview

Personas is built on a modern, scalable architecture that leverages the Bitcoin Cash ecosystem while providing a seamless user experience.

## Core Components

### Frontend Layer
- **Nuxt.js Framework**: Server-side rendered Vue.js application
- **Vite Build Tool**: Fast development and optimized production builds
- **Tailwind CSS**: Utility-first CSS framework for responsive design

### Smart Contract Layer
- **CashScript v0.11.5**: Bitcoin Cash smart contract scripting
- **Account Abstraction**: Enables gasless transactions and enhanced UX
- **Paymaster System**: Handles transaction fees for users

### Authentication & Security
- **WebAuthn/Passkeys**: Passwordless authentication standard
- **Social Recovery**: Decentralized account recovery mechanism
- **Multi-signature**: Enhanced security for high-value transactions

## Data Flow

1. **User Input**: Natural language commands processed by AI layer
2. **Intent Recognition**: AI interprets user intent and maps to blockchain operations
3. **Transaction Construction**: Smart contracts construct appropriate transactions
4. **Signing**: User approves transaction with passkey authentication
5. **Execution**: Transaction broadcast to Bitcoin Cash network
6. **Confirmation**: User receives confirmation and updated state
