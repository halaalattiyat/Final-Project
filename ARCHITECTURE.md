
# Tabasheer Khair (تباشير خير) - Architecture Manifesto

## Core Principles
1. **Clean Architecture**: Strict separation between business logic (Entities/Use Cases) and external dependencies (React/Node.js).
2. **Jordanian Identity**: Design palette inspired by the Jordanian flag (Green #007A3D, Red #CE1126, Black, and White) with a premium sand/gold accent.
3. **Modular Backend**: Node.js (.js) modular structure following the "Screaming Architecture" pattern.
4. **Production Ready**: Scalable folder structure, TypeScript for frontend safety, and robust service layers.

## Modules Plan
- **Module 1: Foundation & Identity**: UI Theme, Layout, and Core Entities.
- **Module 2: Search & Discovery**: Medical specialty filtering, Hospital profiles, and Treatment program listings.
- **Module 3: Booking Engine**: Personalized treatment requests and scheduling.
- **Module 4: User & Admin Dashboards**: Secure patient records and administrative management.
- **Module 5: Integration**: Gemini-powered medical concierge for personalized recommendations.

## Directory Structure (Conceptual)
/src
  /domain       (Entities & Business Logic)
  /usecases     (Application Logic)
  /adapters     (Controllers, Gateways)
  /frameworks   (UI, External APIs)
/server         (Node.js Backend - Modular .js files)
