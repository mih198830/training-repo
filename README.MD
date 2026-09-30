The case has three user-level steps:

1. Open a casino and verify that it opens.
2. Select the EN locale and verify that it is selected.
3. Add Latin characters after the site root, open that URL, and verify that the English “page not found” message is displayed.

## Exercise 1 — Understand the test case (15–20 minutes)

1. 
Question: What user or release risk does this test case cover? 
Answers:
- This test case cover risk that entering random symbols after root does not grant user access and does not redirect to any working directory;
- And displayed user-friendly error message using same language that user selected;

2. 
Question: What is the starting state? Identify any preconditions that the case assumes but does not state explicitly.
Answers: 
- VPN access needed;
- Test should open main page of casino;
- Also browser type and platform can be stated in preconditions;

3. Separate the input, user actions, and observable expected results.

Input: Print/paste casino url;
EN local;
Latin characters;

User actions: open casino url (Enter);
Select EN local;
Print random or hardcoded latin characters after site root, press ENTER and open that URL;

Observable expected result: verify page opens and successfully loaded;
Local should be selected to EN;
Verify that the English “page not found” message is displayed;

4. What does “without doubling the EN locale” mean from a user's point of view? How would you prove it without inspecting application code?

5. Which result is essential for passing the case, and which observations would only be useful diagnostic evidence?
- It is important, that non existing directory (with random/hardcoded text) - displays user friendly error message using English text;
- Diagnostic evidence: selection of local to EN;

6. Name two ambiguities or missing details that you would clarify before automating the case.
- In step 2 EN local should be selected on site? Not system local, right?
- In step 3 Enter button may be named differently (on mobile devices for example);
- Should printed latin text be randomized?
- Should be verify response code itself (404)?
- Are we display EN text for all latin based languages? (French, German etc)?

## Exercise 2 — Automation value map

First, map the production behaviour represented by C4605545 to a safe synthetic training analogue. Do not implement it and do not inspect production code.



Complete this table in your submission:

| Production behaviour and risk | https://prodsite.xyz/ and random input by 5 latin symbols. Local = EN

Synthetic training analogue | https://core.xxx.yyyy.xyz/ and random input by 5 latin symbols. Local = EN

Internal read-only analogue (`core-tests` / `UI`/ `Navigation`) 

| Behaviour deliberately preserved | 

Production complexity deliberately omitted |


After your first attempt, identify the corresponding read-only framework/area and explain what is not transferred. Use mentor-selected learning material or ask a mentor; do not inspect or copy production code for this comparison.

The synthetic analogue must use a fictional application, fake URL, and synthetic data. It should preserve the observable locale-routing risk while excluding production endpoints, configuration, accounts, and framework implementation.

Then propose four to six checks around the synthetic behaviour. Include the analogue of the TestRail scenario and relevant positive, negative, or boundary variations. Use the smallest test layer that can provide the required signal.

For every check, fill in this table in your submission:

1) | Check |  When local is part of URL => site correctly opens and displays correct local

|User or release risk | Release risk

|Layer: unit / integration / E2E | Integration
 
 Narrowest scope: smoke / critical / regression | Smoke
 
|Tag / suite| @SiteNavigation/UI
  
| Why automate or keep manual| 
  
| Data and dependencies | Mock boundary: real or controlled | Controlled/mock

2)
| Check |  Printed random non latin text leads to user friendly message displayed

|User or release risk | User risk

|Layer: unit / integration / E2E | Integration
 
 Narrowest scope: smoke / critical / regression | Smoke
 
|Tag / suite| @SiteNavigation/UI
  
| Why automate or keep manual| Better automate, to be able to send randomized data on a regular basis
  
| Data and dependencies | Mock boundary: real or controlled | Controlled/mock

3)
| Check |  

|User or release risk | User risk

|Layer: unit / integration / E2E | Integration
 
 Narrowest scope: smoke / critical / regression | Smoke
 
|Tag / suite| @SiteNavigation/UI
  
| Why automate or keep manual| Better automate, to be able to send randomized data on a regular basis
  
| Data and dependencies | Mock boundary: real or controlled | Controlled/mock



Rules:

- Do not place every check in E2E.
- If you select E2E, explain why a lower layer cannot provide enough confidence.
- Name the observable result, not an implementation detail.
- In this team's scope model, every check belongs to `regression`; `critical` includes `smoke`, and `regression` is the full set. For each check, select the narrowest scope that must include it; a broader run includes checks from narrower scopes.
- Scope determines which checks are run, not whether they should be automated or whether a failure blocks release. Explain those decisions separately.
- Separate a release-blocking signal from useful non-blocking regression evidence.
- State the proposed tag/suite for each automated check and explicitly identify its dependency boundary: real dependency or controlled/mock. Write “no mock” when appropriate.
- After completing your first attempt, identify the corresponding read-only framework/area and explain what is not transferred. Use mentor-selected learning material or ask a mentor; do not inspect or copy production code for this comparison.

After the table, add a short recommendation that answers:

- What is the narrowest scope that should include C4605545 checks, and why? Which wider scopes include them too? - Smoke;
- Which dependencies could cause a false failure? - No EN local present
- Which failure signal, if any, should block a release? - EN local show text on another language;