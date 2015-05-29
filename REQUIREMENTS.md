# portals.rulesengine

## DEFINITIONS

### Drafts

Drafts are the starting point for building a policy. Drafts are editable.

### Policies

Policies are deployable, locked drafts. They are read-only. They are created by “locking drafts” which effectively copies the XML contents of the draft to a policy where it can no longer be altered.

### Deploy Requests

Deploy Requests represent a request to deploy a particular policy to a particular environment. They are created by first selecting a policy to deploy, then a target environment (PRODUCTION or STAGING), and then providing a required deploy message to accompany the request. Deploy Requests have states. The workflow of this state is protected and is primarily used internally. There is on exception permitted in the case of canceling, which allows users to cancel a request if the current state is either “pending review” or “escalated”.

## GLOBAL: Functionality
- all pages should be scoped to the relevant platform (HTTP Large, HTTP Small, etc) based on the `MEDIA_TYPE_ID` defined in the `GLOBAL_CONFIG` variable by .NET
- each page should provide breadcrumb navigation to allow users to dive in and back out of any given resource scope (e.g. “Rules Engine / Drafts / 123”)

## VIEWS: Overview

### Main Content
- should display active deployment in each environment (PRODUCTION and STAGING) 
  - if no active deploy request can be found, it should display no active policy message
  - should provide links to both the active policy and deploy request that initiated the deployment
- should display tabbed navigation to toggle between lists of most recently modified drafts (default tab) and policies
  - each list should provide a search box for filtering the list based on arbitrary string input
  - each list should provide a button to modify the default sorting of the list
  - sort options should include name, created date and updated date 
  - the drafts list should include a [ + ] button to create a new draft from scratch, which will redirect the user to a `drafts/create` path to input a name to get started building a draft (policies are created from drafts and do not have this feature)
  - each list item should provide a link to view the item in detail
  - each list item should provide both `created_at` and `updated_at` stamps 

### Sidebar
  - should display 10 most recently modified deploy requests including link to view the deploy request as well as current status, modified time and message 
  
## VIEWS: Drafts

### Index
- this view is the same view as the one used on the overview drafts tab, all functionality is the same

### Create
- should display an empty text field for the user to enter a name
- the user may either choose to create the draft or cancel and return to the index
- if the user chooses to create the draft they will be redirected to the newly created draft using the views below

### Show / Edit
- the show / edit page provides the user a single place to both view and edit the draft
- should provide a button to duplicate the draft creating a new draft using the convention “Copy of {{ draft name }}”
- should provide a button to delete the draft, which will spawn a confirmation dialog to ensure the user wished to delete the draft
- should provide a button to [ Lock Draft as Policy ] which creates a new policy based on the XML generated in the draft
- should provide the ability to edit the name of the draft, indicated by a pencil icon next to the name
- toggling between rule builder and XML should show equivalent information of the draft state
- if a draft is being edited, the user should be prompted to discard changes or save before toggling view or otherwise navigating away  

#### Rulebuilder Mode
- should provide a button to add a rule to the draft
- editing and deleting should be enabled at the rule level with available buttons
- deleting a rule
  - each rule should provide a button to delete the rule 
  - deleting a rule should spawn a confirmation overlay
- editing a Rule
  - each rule should provide a button to edit the rule 
  - selecting the edit button should query the server for all matches, features and attributes required to modify rules
  - user should be able to edit the optional description of the rule
  - user should be able to add, remove or get help information on any match or feature
  - user should be able to use the interface to inject any of the following node types: `select.first-match`, `match.*`, `feature.*`) 
  
#### XML Mode (view only)
- currently XML view is not an editable interface, the intention is to enable this feature in a future release
- the resulting XML of all nodes in a given draft should be wrapped in a `<policy>` node
- the resulting XML of a group of rules should be wrapped in a `<rules>` node
- the resulting XML of a rule should be wrapped in a `<rule>` node


## VIEWS: Policies

### Index
- this view is the same view as the one used on the overview policies tab, all functionality is the same

### Show
- the show page provides a place to view the policy
- should provide a button to duplicate the policy creating a new draft using the convention “Copy of {{ policy name }}”
- should provide a button to [ Deploy Request  ] which will initiate a process to create a deploy request for the policy

#### Rulebuilder Mode
- this is a non-editable version of the same rule builder view described above for drafts

#### XML Mode
- this is the same view as the one described above for drafts

## VIEWS: Deploy Requests

### Index
- should provide a list of sortable searchable deploy requests

### Create
- should show the policy being deploy requested
- a drop down to select target deployment environment
- once the target is selected the XML of the 2 policies will be differ for review
- the user should add a message and then click [ Create Deploy Request ] to continue
- once submitted the page should be redirected to the Show view for the newly created deploy request

### Show
- should show the diff
- should display the status history in the right side bar
- should display a label in the heading for current status
- as mentioned if the deploy request is “Pending Review” the user should have the option to cancel the request using a button in the heading of the view - this button is only visible if the request is cancelable
- canceling a request will spawn a modal to prompt the user to confirm cancelation


### Example Rules Engine Workflow

1. Create a draft and add rules to the draft
2. Lock the draft to create a policy
3. Initiate a deploy request for the policy
4. Select a target environment for deployment
  a. Staging
  b. Production
5. Review the changes against the currently deployed policy (XML diff)
6. Add a message and submit the deploy request
7. The policy will either be automatically approved or sent for review and will then either be approved or rejected
8. Once approved the policy will be deployed and the deploy request state will be updated to indicate this
