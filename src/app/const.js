angular.module('rules').constant('CONST', {
  REGEX: {
    EMAIL: /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/,
    REQUIRED: /([^\s])/,
    SINGLEWORD: /^\w[a-zA-Z0-9]*$/,
    SINGLEWORDWITHDOT: /^\w[a-zA-Z0-9.\-]*$/,
    INTEGER: /^([0-9]{1,9}|1[0-9]{9}|2(0[0-9]{8}|1([0-3][0-9]{7}|4([0-6][0-9]{6}|7([0-3][0-9]{5}|4([0-7][0-9]{4}|8([0-2][0-9]{3}|3([0-5][0-9]{2}|6([0-3][0-9]|4[0-7])))))))))$/
  },
  EVENTS: {
    KICKOFF_VALIDATIONS: '1001',
    INSTANT_MESSAGING:'1002',
    DRAFT_LOADED:'1003'
  }
}).constant('ENUMS', {
  NODETYPE: {
    FEATURE:1,
    MATCH:2,
    SELECT: 3,
    COMMENT:4
  }
}).constant('CODES', {
  services:{
    error: {code: 400, text: 'An error occurred, please try again.', error: true}
  },
  draft_save: {
    success: {code: 101, text: 'Draft has been successfully saved.', success: true},
    error: {code: 102, text: 'An error occurred. Please try again.', error: true},
    warning: { code: 103, text: 'Draft could not be saved. Something is missing. Please review the draft and try again.', warning: true},
    form_error: {code: 104, text: 'Draft could not be saved. Invalid inputs. Please review the draft and try again.', error: true}
  },
  draft_delete: {
    success: {code: 104, text: 'Draft has been successfully deleted.', success: true},
    error: {code: 105, text: 'An error occurred. Please try again.', error: true},
    warning: {code: 106, text: 'Draft could not be deleted. Please review the draft and try again.', warning: true}
  },
  draft_copy: {
    success: {code: 104, text: 'Draft has been successfully duplicated.', success: true},
    error: {code: 105, text: 'An error occurred. Please try again.', error: true},
    warning: {code: 106, text: 'Draft could not be duplicated. Please review the draft and try again.', warning: true}
  },
  policy_save: {
    success: {code: 201, text: 'Policy has been successfully created.', success: true},
    form_error: {code: 104, text: 'Policy could not be created. Invalid inputs. Please review the draft and try again.', error: true},
    error: {code: 202, text: 'An error occurred. Please try again.', error: true},
    // TODO: when does this happen?
    warning: {code: 203, text: 'Policy could not be saved. Something is missing. Please review the policy and try again.', warning: true},
  },
  policy_delete: {
    success: {code: 204, text: 'Policy has been successfully archived.', success: true},
    error: {code: 205, text: 'An error occurred. Please try again.', error: true},
    warning: {code: 206, text: 'Policy could not be archived. Please check the policy and try again.', warning: true}
  },
  policy_copy: {
    success: {code: 207, text: 'Policy has been successfully duplicated.', success: true},
    error: {code: 208, text: 'An error occurred. Please try again.', error: true},
    warning: {code: 209, text: 'Draft could not be duplicated. Please review the draft and try again.', warning: true}
  },
  deploy_request_save: {
    success: {code: 301, text: 'Deploy request has been successfully created.', success: true},
    error: {code: 302, text: 'An error occurred. Please try again.', error: true},
    warning: { code: 303, text: 'Deploy request could not be created. Something is missing. Please review the request and try again.', warning: true}
  },
  deploy_request_cancel: {
    success: {code: 310, text: 'Deploy request has been successfully cancelled.', success: true},
    error: {code: 311, text: 'An error occurred. Please try again.', error: true},
    warning: { code: 312, text: 'Deploy request could not be cancelled. Something is missing. Please review the request and try again.', warning: true}
  }
});
