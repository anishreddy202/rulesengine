# Changelog

## 0.2.5 - 2015-05-22
  - [POR-5114] Add ability to archive policies
  - [POR-5762] No error message when create a draft with duplicate name
  - [POR-5838] Feature Name reverts to Select Feature
  - [POR-5650] Use message provided in error responses when available.
  - [POR-5670] options data available in lookup
  - [POR-5879] No error message for deploy request is under process
  - [POR-5868] Do NOT Allow Invalid ip address to lock a draft

## 0.2.4 - 2015-05-18
  - [POR-5857] Customer Staging UI is missing.

## 0.2.3 - 2015-05-13
  - [POR-5650] Use messages provided in error responses where available.
  - [POR-5814] Page is frozen after failed to lock draft.
  - [POR-5109] Help Links for Rules.
  - [POR-5762] No error message when create a draft with duplicated name.

## 0.2.2 - 2015-05-7
  - [POR-5656] Add help text icon to Match legend (Text and HTML)
  - [POR-5612] Sporadic Bad Request errors on landing page
  - [POR-5759] Change Deployment Delayed state icon
  - [POR-5764] Filtering list of matches not working
  - Undoing POR-5651

## 0.2.1 - 2015-05-1
  - [POR-5651] Provide a mechanism for users to be able to discover/revert to original default values
  - [POR-5566] Convert deploy requests list on home page to not use timeline style
  
## 0.2.0 - 2015-04-29
  - POR-5649 Loading indicator on Home Page
  - POR-5391 Enable rules sorting
  - POR-5424 Filtering list of matches and features based on enabled
  - POR-5464 Support for new deploy request states
  
## 0.1.28 - 2015-04-15
  -  POR 5520 - Form Validation assumptions are incorrect
  -  POR 5589 - Add Cancel for Submitted states
  
## 0.1.27 - 2015-04-13
  -  POR 5577 - Latest deployed for diff

## 0.1.26 - 2015-04-10
  -  POR 5520 - Rule validations check turned off.

## 0.1.25 - 2015-04-09
  -  POR 5515 - Deployed policy is still incorrect, not getting updated with the latest.

## 0.1.24 - 2015-04-09
  -  bugfix: When viewing a draft with no rules, the add button is disabled
  -  bugfix: "No policy deployed" message is not showingup in the home when a policy is deployed
  -  bugfix: validation error label styles
  
## 0.1.23 - 2015-04-09
  - absolute path reference issue fix
  
## 0.1.22 - 2015-04-09

 - POR-5507	Lock draft is broken
 - POR-5508	Delete rule is not currently working
 - POR-5509	If user does not change match from default value General>Always to something else an error occurs when adding a feature.
 - POR-5099 feedback for invalid rules/inputs should be on the rule/input creating the issue

## 0.1.21 - 2015-04-08

- POR-5467 Timestamps are UTC, should be in local or append UTC
- POR-5465 Convert checkboxes to [ yes / no ] toggle
- POR-5463 Determine why show view of rules does not implement ordinal of attributes
- POR-5152 All rules in rule builder should first appear collapsed for better visibility
- POR-5150 Overview copy for active deployments says "In production since..." for staging
- POR-5151 Adding new rule should trigger edit mode and disallow navigation without confirmation


## 0.1.20 - 2015-04-03

- Tag new build to test deployment pipeline (no code changes)


## 0.1.19 - 2015-04-03

- POR-5433 Hitting back from a draft in edit mode does not spawn confirmation
- Deployed Policy not updating to latest after a new Deploy Request


## 0.1.18 - 2015-03-27

- change select options data schema to [name, value]

## 0.1.17 - 2015-03-27

- pass match id to pull feature details
- replace dropdowns with select

## 0.1.16 - 2015-03-27

- route handler resolve updated to avoid bundling issue

## 0.1.15 - 2015-03-27

- update ID on PUT requests
- [POR-5148](https://ecjira.atlassian.net/browse/POR-5148) Handle 500 and other error responses.

## 0.1.14 - 2015-03-25

- [POR-5101](https://ecjira.atlassian.net/browse/POR-5101) add cancel button to deploy request show
- [POR-5098](https://ecjira.atlassian.net/browse/POR-5098) rulebuilder: relax validation and allow partial saves where feasible
- [POR-5096](https://ecjira.atlassian.net/browse/POR-5096) enforce draft/rule save before switching to raw view
- [POR-5094](https://ecjira.atlassian.net/browse/POR-5094) on save of draft/rule, preserve collapse state, do not open all rules

## 0.1.13 - 2015-03-25

- Merge conflict fixes. (ignore this build)

## 0.1.12 - 2015-03-24

- baseline version for all changes moving forward
- new issues will need to be captured in Jira and referenced here when completed in a build
