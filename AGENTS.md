# AGENTS.md

# Land Intelligence Kosovo

## 1. Project Overview

**Land Intelligence Kosovo** is a mobile application designed to help people find, evaluate, and compare land parcels in Kosovo based on their specific investment goals.

The application addresses the difficulty of finding and evaluating land information, which is often scattered across different sources and difficult to interpret.

Instead of simply displaying available parcels, the application helps users understand how suitable a particular parcel is for their intended purpose.

The platform combines:

- Structured land parcel information.
- User-defined investment requirements.
- Transparent and explainable suitability criteria.
- Comparative analysis between parcels.
- AI-generated explanations based on structured data and analysis results.

The main principle is that AI should help users understand the results, not invent information or make unsupported claims about land parcels.

## 2. Target Users

The primary target users are people interested in purchasing or investing in land in Kosovo.

Examples include:

- Individuals looking for land to build a family home.
- People interested in purchasing land as an investment.
- Buyers who want to evaluate multiple parcels before making a decision.

The initial user scenario focuses on someone searching for land based on a particular purpose, location, minimum area, and budget.

## 3. Problem Statement

Finding suitable land in Kosovo can be difficult because:

- Information about land parcels is scattered.
- Buyers may need to consult multiple sources.
- Comparing different parcels is time-consuming.
- It is difficult to determine whether a parcel meets specific investment requirements.
- Buyers may lack a structured way to evaluate the advantages and limitations of different parcels.

The project aims to organize available information and provide a structured decision-support process.

## 4. Proposed Solution

Land Intelligence Kosovo provides a mobile interface where users can:

1. Define their investment requirements.
2. Search and explore land parcels.
3. Inspect individual parcel information.
4. Evaluate parcel suitability using documented criteria.
5. Understand the advantages and limitations of each parcel.
6. Compare two parcels to support their decision.

The application should prioritize transparency, explainability, and reliable information.

A suitability score must be supported by documented criteria and weights. Users should be able to understand why a parcel receives a particular score.

AI is used to explain structured information and analysis results. It must not generate fictional parcel characteristics or present unverified information as fact.

---

## 5. Main User Workflows

The main application workflows are based on HARTA.md.

### 5.1 Investment Setup

The user defines the requirements for their land search.

The initial criteria include:

- Investment purpose/type.
- Preferred location.
- Minimum land area.
- Available budget.

These requirements are used to guide the subsequent search and evaluation process.

### 5.2 Land Search and Map Exploration

The user explores available land parcels based on the previously defined requirements.

The search experience should allow users to explore and filter the available parcel information.

A map-based exploration interface is part of the documented application flow.

### 5.3 Parcel Details

The user selects a parcel and opens its details.

The details screen should present the available structured information about that parcel.

Information must be clearly distinguished according to its verification status and source.

The application must not imply that information is officially verified when it is not.

### 5.4 Suitability Analysis

The user accesses an analysis of how suitable a parcel is for their investment purpose.

The analysis should include:

- A suitability score.
- The documented evaluation criteria.
- Advantages of the parcel.
- Limitations or potential disadvantages.
- An explanation of the analysis results.

The score must follow documented criteria and weights.

Do not introduce arbitrary scoring rules or change existing weights without explicit project documentation or team agreement.

### 5.5 Parcel Comparison

The user selects two parcels and compares them.

The comparison should help users understand the differences between the selected parcels based on available information and suitability analysis.

Do not introduce unsupported comparison criteria.

---

## 6. MVP Scope and Limitations

The initial MVP focuses on demonstrating the core land evaluation and comparison experience.

### Included in the MVP

- Mobile application built with Expo and React Native.
- Investment requirement setup.
- Land parcel search and exploration.
- Parcel details.
- Suitability analysis.
- Comparison of two parcels.
- Supabase PostgreSQL database.
- Supabase Authentication.
- Row Level Security (RLS).
- Supabase Edge Functions where server-side functionality is required.
- Demonstrative parcel dataset.
- Loading, empty, error, and success states.

### Explicitly Outside the Current MVP Scope

Do not independently introduce the following features:

- A complete land marketplace.
- Payment processing.
- Full coverage of every land parcel in Kosovo.
- Automatic cadastral or institutional integrations.
- Legal verification of land ownership.
- Land price forecasting.
- Financial or tax management modules.

These features are outside the currently documented MVP scope.

Any expansion must be discussed and approved by the project team.

---

## 7. Technology Stack

Use the existing project configuration as the source of truth.

### Mobile Application

- Expo
- React Native
- TypeScript / JavaScript, according to the actual files and configuration.
- Existing Expo project structure.

Do not assume that a technology is configured simply because it is mentioned in the project documentation. Inspect `package.json`, `tsconfig.json`, and the existing source files.

### Backend and Database

- Supabase
- PostgreSQL
- Supabase Authentication
- Row Level Security (RLS)
- Supabase Edge Functions when server-side operations are required.

### Development Tools

- Git and GitHub for version control.
- npm for dependency management, following the existing lockfile.
- Supabase client libraries according to the installed project configuration.

Do not replace existing technologies or introduce additional frameworks without an explicit reason and team approval.

---

## 8. Project Structure

Always inspect the actual repository before modifying files.

The current prototype includes the main application entry point and supporting project resources.

Known project elements include:

- `App.tsx` – Main application entry point.
- `assets/` – Application assets.
- `lib/` – Supporting application utilities and shared functionality.
- `package.json` – Project dependencies and scripts.
- `app.json` – Expo application configuration.
- `AGENTS.md` – AI agent development instructions.
- `EKIPI.md` – Team information and project context.
- `BISEDAT.md` – User interview documentation.
- `HARTA.md` – Application flow and screen documentation.

The exact structure must be verified against the current repository.

Before creating new folders or files:

1. Inspect the existing structure.
2. Check whether the required functionality already exists.
3. Reuse existing modules when appropriate.
4. Avoid unnecessary duplication.
5. Keep the structure consistent with the current application.

Do not reorganize the repository without a clear technical reason.

---

## 9. Coding Conventions

Follow these development rules throughout the project.

### General Principles

- Write readable, maintainable, and modular code.
- Prefer simple solutions over unnecessary abstractions.
- Follow the existing project conventions.
- Avoid duplicating business logic.
- Use meaningful names for variables, functions, and components.
- Keep components focused on a clear responsibility.
- Avoid unnecessary dependencies.
- Do not introduce features that are not documented or approved.

### React Native and Expo

- Use functional React components.
- Use React hooks appropriately.
- Keep UI components separate from business logic when practical.
- Reuse components where appropriate.
- Handle loading, empty, error, and success states.
- Ensure that the interface works on mobile devices.
- Follow the existing Expo configuration.

### TypeScript

If the project uses TypeScript:

- Prefer explicit types for important data structures.
- Define reusable interfaces or types where appropriate.
- Avoid unnecessary use of `any`.
- Keep API responses and database models properly typed.
- Do not suppress TypeScript errors without a justified reason.

If the existing project uses JavaScript, follow its current configuration instead of migrating the project automatically.

### Naming

Use descriptive and consistent naming.

- Components: PascalCase.
- Functions and variables: camelCase.
- Constants: follow the existing project convention.
- File names: follow the existing repository convention.

### Code Quality

Before completing a task:

- Check for TypeScript or JavaScript errors.
- Check imports and dependencies.
- Review the affected functionality.
- Verify that existing features have not been unintentionally broken.
- Avoid modifying unrelated files.

---

## 10. Supabase and Database Security

Security is a fundamental requirement of this project.

### Row Level Security (RLS)

- Enable RLS on all tables exposed through the Supabase Data API.
- Define explicit policies for database operations.
- Apply the principle of least privilege.
- Users must only access or modify records they are authorized to access.
- Do not assume that hiding a UI element provides database security.
- Never rely exclusively on client-side authorization.

### Authentication

- Use Supabase Authentication for user identity.
- Verify authorization through database policies and trusted server-side operations.
- Do not expose private user information to unauthorized users.

### API Keys and Secrets

- Never hardcode Supabase service role keys or other privileged credentials in the mobile application.
- The Supabase anon/publishable key may be used in the client when RLS is correctly configured.
- Store secrets in appropriate environment variables or Supabase secrets.
- Never commit private credentials to GitHub.

### Database Operations

- Keep database operations consistent with the documented data model.
- Validate user input.
- Avoid trusting client-provided values for privileged operations.
- Use appropriate constraints and relationships.
- Do not introduce database tables or columns without understanding their purpose and relationship to the application.

### Edge Functions

When server-side operations are required:

- Use Supabase Edge Functions.
- Validate incoming requests.
- Verify authentication and authorization.
- Keep privileged operations on the server.
- Never expose service role credentials to the client.

---

## 11. AI Integration Rules

AI must support the application's decision-making process without becoming a source of fabricated information.

Follow these principles:

1. AI explanations must be based on structured parcel information and actual analysis results.
2. AI must not invent parcel characteristics, ownership information, prices, infrastructure, or legal status.
3. AI must distinguish verified information from synthetic or unverified information.
4. AI must not modify or independently determine the suitability score.
5. Suitability scoring must be handled through documented and reproducible criteria.
6. AI-generated explanations must not be presented as official legal, cadastral, or financial assessments.
7. Missing information must be communicated explicitly rather than guessed.

The AI component is an explanatory layer, not the authoritative source of parcel data.

---

## 12. Data Integrity and Verification

The application may use a demonstrative dataset during MVP development.

When working with parcel data:

- Clearly identify synthetic or demonstration records.
- Do not present synthetic records as real verified land parcels.
- Preserve the original source and verification status of available information.
- Do not invent missing values.
- Handle incomplete information explicitly.
- Keep the distinction between available information and officially verified information clear.

Data reliability is more important than displaying a large quantity of information.

---

## 13. Development Workflow and AI Agent Instructions

Before implementing any task:

1. Read `AGENTS.md`.
2. Inspect the relevant application files.
3. Review `EKIPI.md`, `BISEDAT.md`, and `HARTA.md` when the task relates to project requirements or user workflows.
4. Understand the existing implementation before making changes.
5. Identify which files need modification.
6. Implement only the requested functionality.
7. Verify the changes.

### Important Restrictions

- Do not invent requirements.
- Do not modify documented user workflows without approval.
- Do not change suitability criteria or scoring weights without approval.
- Do not introduce new architectural decisions without justification.
- Do not install dependencies unless the task requires them and the change is explicitly requested or approved.
- Do not modify unrelated application code.
- Do not commit or push changes unless explicitly requested.
- Do not overwrite existing functionality without understanding its purpose.

### When Requirements Are Unclear

If a requirement is ambiguous:

1. Identify what is missing.
2. Explain the possible interpretations.
3. Ask for clarification when the decision affects architecture, database design, security, or core functionality.
4. Do not silently make assumptions that could affect the project.

### Task Completion

After implementing a task, provide:

- A summary of what was implemented.
- A list of files created or modified.
- Any relevant technical decisions.
- Any assumptions made.
- Any unresolved issues.
- The verification performed.

Do not claim that functionality was tested if it was not actually tested.

---

## 14. Project Documentation

The following documents are important sources of project requirements:

| Document | Purpose |
|---|---|
| `EKIPI.md` | Team information and project context |
| `BISEDAT.md` | User interviews and collected feedback |
| `HARTA.md` | Application structure, screens, and user workflows |
| `AGENTS.md` | Development rules and instructions for AI coding agents |

When implementing a feature, prioritize documented user needs and workflows.

If implementation decisions conflict with project documentation, identify the conflict instead of silently changing the requirements.

---

## 15. Core Development Principle

**Build a reliable, explainable land intelligence application, not simply a land listing application.**

Every feature should contribute to helping users evaluate land parcels based on their investment requirements.

Prioritize:

- Data integrity.
- Transparent suitability analysis.
- Explainable results.
- Secure database access.
- Clear user workflows.
- Maintainable application architecture.

Do not sacrifice reliability or transparency for unnecessary complexity.