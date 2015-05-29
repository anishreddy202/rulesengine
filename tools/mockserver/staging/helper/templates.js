(function() {
  var rule_template;

  rule_template = {
    "types": {
      "RulesList": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "schema-version",
            "display": null,
            "type": "xs:nonNegativeInteger",
            "multiple": false,
            "use": "optional",
            "default": null
          }, {
            "tag": "rulesetversion",
            "display": null,
            "type": "xs:nonNegativeInteger",
            "multiple": false,
            "use": "optional",
            "default": null
          }, {
            "tag": "rulesetid",
            "display": null,
            "type": "xs:nonNegativeInteger",
            "multiple": false,
            "use": "optional",
            "default": null
          }
        ],
        "isArray": true,
        "element": "Rule"
      },
      "Rule": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "id",
            "display": null,
            "type": "xs:nonNegativeInteger",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "platform",
            "display": null,
            "type": "Platform",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "custid",
            "display": null,
            "type": "CustomerId",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "version",
            "display": null,
            "type": "xs:nonNegativeInteger",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "status",
            "display": null,
            "type": "RuleStatus",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "name",
            "display": null,
            "type": "xs:string",
            "multiple": false,
            "use": "optional",
            "default": null
          }
        ],
        "isArray": true,
        "element": "xs:string"
      },
      "RegexRewriteType": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "pattern",
            "display": null,
            "type": "RegexType",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "xs:string",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "RegexRedirectType": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "code",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "choice": [
                {
                  "value": "301",
                  "display": null
                }, {
                  "value": "302",
                  "display": null
                }
              ]
            },
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "pattern",
            "display": null,
            "type": "RegexType",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "xs:string",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "ContinueCacheFillType": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "min-partial-hit-size",
            "display": null,
            "type": "xs:unsignedInt",
            "multiple": false,
            "use": "optional",
            "default": "0"
          }
        ]
      },
      "TrueClientIPType": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "key",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "regex": "[-_a-zA-Z0-9]+"
            },
            "multiple": false,
            "use": "optional",
            "default": "True-Client-IP"
          }
        ]
      },
      "BETagListValue": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "BETagListType",
            "multiple": false,
            "default": null
          }
        ]
      },
      "QuickResponseType": {
        "shape": null,
        "display": null,
        "attributes": []
      },
      "FileExtensionListValue": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "multiple": true,
              "type": {
                "shape": null,
                "display": null,
                "attributes": [],
                "regex": "(\\.[^. ]+\\s*)+"
              }
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "LoglessFeature": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "log-file",
            "display": null,
            "type": "xs:string",
            "multiple": false,
            "use": "optional",
            "default": "logless"
          }
        ]
      },
      "ReportCodeType": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "code",
            "display": null,
            "type": "xs:unsignedInt",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "enable",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "ProxyConnTimeoutsType": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "connect-timeout",
            "display": null,
            "type": "xs:unsignedInt",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "max-connect-retry",
            "display": null,
            "type": "xs:unsignedInt",
            "multiple": false,
            "use": "optional",
            "default": "4"
          }, {
            "tag": "max-request-retry",
            "display": null,
            "type": "xs:unsignedInt",
            "multiple": false,
            "use": "optional",
            "default": "16"
          }, {
            "tag": "read-idle-timeout",
            "display": null,
            "type": "xs:unsignedInt",
            "multiple": false,
            "use": "optional",
            "default": "0"
          }, {
            "tag": "idle-timeout",
            "display": null,
            "type": "xs:unsignedInt",
            "multiple": false,
            "use": "optional",
            "default": "0"
          }
        ]
      },
      "CacheMethodsType": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "multiple": true,
              "type": {
                "shape": null,
                "display": null,
                "attributes": [],
                "choice": [
                  {
                    "value": "GET",
                    "display": null
                  }, {
                    "value": "POST",
                    "display": null
                  }, {
                    "value": "PUT",
                    "display": null
                  }
                ]
              }
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "ProxyExpBackoffType": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "disable-time",
            "display": null,
            "type": "xs:float",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "max-disable-time",
            "display": null,
            "type": "xs:float",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "backoff-scale-up",
            "display": null,
            "type": "xs:float",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "backoff-scale-down",
            "display": null,
            "type": "xs:float",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "max-backoff-factor",
            "display": null,
            "type": "xs:float",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "SSLCipherListType": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "regex": "([!-\\+]?[-_a-zA-Z0-9]+[:, ]*)+"
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "ConnBWThrottlingType": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "kbytes-per-second",
            "display": null,
            "type": "xs:unsignedInt",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "prebuf-seconds",
            "display": null,
            "type": "xs:decimal",
            "multiple": false,
            "use": "optional",
            "default": null
          }
        ]
      },
      "UserVariableType": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "name",
            "display": null,
            "type": "MatchFieldName",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "xs:string",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "ECTokenQueryParam": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "MatchFieldName",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "enable",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "BytesType": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "xs:unsignedInt",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "units",
            "display": null,
            "type": "ByteUnits",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "IgnoreOriginNoCacheType": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": []
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "HttpHeaderListValue": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "HttpHeaderListType",
            "multiple": false,
            "default": null
          }
        ]
      },
      "HttpStatusCodeValue": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "HttpStatusCodeType",
            "multiple": false,
            "default": null
          }
        ]
      },
      "HttpStatusCodeListValue": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "HttpStatusCodeListType",
            "multiple": false,
            "default": null
          }
        ]
      },
      "TimeIntervalFeature": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": []
            },
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "units",
            "display": null,
            "type": "TimeUnits",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "status",
            "display": null,
            "type": "HttpStatusCodeType",
            "multiple": false,
            "use": "optional",
            "default": "200"
          }
        ]
      },
      "TokenAuthDenialCodeFeature": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "choice": [
                {
                  "value": "301",
                  "display": null
                }, {
                  "value": "302",
                  "display": null
                }, {
                  "value": "307",
                  "display": null
                }, {
                  "value": "401",
                  "display": null
                }, {
                  "value": "403",
                  "display": null
                }, {
                  "value": "404",
                  "display": null
                }
              ]
            },
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "header-name",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "choice": [
                {
                  "value": "",
                  "display": null
                }, {
                  "value": "Location",
                  "display": null
                }, {
                  "value": "WWW-Authenticate",
                  "display": null
                }
              ]
            },
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "header-value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "regex": "[ -~]*"
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "PagespeedFeature": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "PagespeedConfig": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "siteconfigid",
            "display": null,
            "type": "xs:nonNegativeInteger",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "WAFType": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "key",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "regex": "([a-fA-F0-9]{1,16}-[a-zA-Z0-9]+|none)"
            },
            "multiple": false,
            "use": "optional",
            "default": null
          }
        ]
      },
      "HeaderTreatmentFeature": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "HeaderTreatment",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "BooleanFeature": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "UnsignedShortValue": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "xs:unsignedShort",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "UnsignedIntValue": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "xs:unsignedInt",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "CommentFeature": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "xs:string",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "SetHeaderFeature": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "action",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "choice": [
                {
                  "value": "set",
                  "display": null
                }, {
                  "value": "append",
                  "display": null
                }, {
                  "value": "unset",
                  "display": null
                }
              ]
            },
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "key",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "regex": "[+-]?[-_a-zA-Z0-9 ]+"
            },
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "regex": "[\t -~]*"
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "LogFieldFeature": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "regex": "([-_\\(\\)\\[\\]= ':;,\\.|a-zA-Z0-9]|%|%\\{[-_a-zA-Z0-9]+\\}[io]|%[b])*"
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "CacheQueriesFeature": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "mode",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "choice": [
                {
                  "value": "include",
                  "display": null
                }, {
                  "value": "exclude",
                  "display": null
                }, {
                  "value": "include-all",
                  "display": null
                }, {
                  "value": "exclude-all",
                  "display": null
                }
              ]
            },
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "regex": "[-_a-zA-Z0-9/~%:;=!,\\.\\+\\*'\\\\\\s]*"
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchCountry": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "CountryCodeListType",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchASN": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "regex": "[0-9? ]+"
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchPop": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "PopCodeListType",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchPopRegex": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "RegexType",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchAlways": {
        "shape": null,
        "display": null,
        "attributes": []
      },
      "MatchHost": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "HostsSet",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "if-none-match",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "optional",
            "default": "false"
          }
        ]
      },
      "MatchCookieParam": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "key",
            "display": null,
            "type": "MatchFieldName",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "regex": "[-@_a-zA-Z0-9/~%:;=!,\\.\\+\\*'\\\\ ]+"
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchKeyToBoolean": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "key",
            "display": null,
            "type": "MatchFieldName",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchKeyToInteger": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "key",
            "display": null,
            "type": "MatchFieldName",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": []
            },
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "compare",
            "display": null,
            "type": "CompareOperator",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchKeyToLiteral": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "key",
            "display": null,
            "type": "MatchFieldName",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "LiteralType",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchKeyToWildcard": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "key",
            "display": null,
            "type": "MatchFieldName",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "WildcardType",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchKeyToRegex": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "key",
            "display": null,
            "type": "MatchFieldName",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "RegexType",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchUrlQueryParam": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "key",
            "display": null,
            "type": "MatchFieldName",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "regex": "[-_a-zA-Z0-9/~%:;=!,\\.\\+\\*'\\\\ ]+"
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchUrlQueryLiteral": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "LiteralType",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchUrlQueryWildcard": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "WildcardType",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchUrlQueryRegex": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "RegexType",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchCustorigin": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "CustOrigin",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchEcorigin": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "EcOrigin",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchClientip": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "IpSubnetList",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchHttpScheme": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "HttpScheme",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchHttpMethod": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": "HttpMethod",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchUrlPathLiteral": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "relative-to",
            "display": null,
            "type": "RelativeTo",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "LiteralType",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchUrlPathWildcard": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "relative-to",
            "display": null,
            "type": "RelativeTo",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "WildcardType",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchUrlPathRegex": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "RegexType",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchUrlPathDirectory": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "relative-to",
            "display": null,
            "type": "RelativeTo",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "regex": "([\\*/][-_a-zA-Z0-9/~%:;=!,\\.\\+\\*'\\\\ ]+[\\*/][ ]?)+"
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchUrlPathFilename": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "regex": "[-_a-zA-Z0-9~%:;=!,\\.\\+\\*\\\\' ]+"
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchUrlPathExtension": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "regex": "[\\.-_a-zA-Z0-9 ]+"
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchRequestHeaderLiteral": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "name",
            "display": null,
            "type": "MatchFieldName",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "LiteralType",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchRequestHeaderWildcard": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "name",
            "display": null,
            "type": "MatchFieldName",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "WildcardType",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchRequestHeaderRegex": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "name",
            "display": null,
            "type": "MatchFieldName",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": "RegexType",
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "MatchReferringDomain": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "ignore-case",
            "display": null,
            "type": "xs:boolean",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "result",
            "display": null,
            "type": "MatchOrNot",
            "multiple": false,
            "use": "required",
            "default": null
          }, {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "regex": "[-@_a-zA-Z0-9/~%:;=!,\\.\\+\\*'\\\\ ]+"
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "SelectFirstMatch": {
        "shape": null,
        "display": null,
        "attributes": [],
        "isArray": true
      },
      "ContentTypeListFeature": {
        "shape": null,
        "display": null,
        "attributes": [
          {
            "tag": "value",
            "display": null,
            "type": {
              "shape": null,
              "display": null,
              "attributes": [],
              "multiple": true,
              "type": "ContentType"
            },
            "multiple": false,
            "use": "required",
            "default": null
          }
        ]
      },
      "BETagListType": {
        "shape": null,
        "display": null,
        "attributes": [],
        "multiple": true,
        "type": "MatchFieldName"
      },
      "HttpStatusCodeType": {
        "shape": null,
        "display": null,
        "attributes": [],
        "regex": "([2-9][0-9][0-9]\\s*)+"
      },
      "HttpHeaderListType": {
        "shape": null,
        "display": null,
        "attributes": [],
        "multiple": true,
        "type": "MatchFieldName"
      },
      "HttpStatusCodeListType": {
        "shape": null,
        "display": null,
        "attributes": [],
        "multiple": true,
        "type": "HttpStatusCodeType"
      },
      "CountryCodeType": {
        "shape": null,
        "display": null,
        "attributes": [],
        "regex": "[A-Z\\?]+"
      },
      "CountryCodeListType": {
        "shape": null,
        "display": null,
        "attributes": [],
        "multiple": true,
        "type": "CountryCodeType"
      },
      "PopCodeType": {
        "shape": null,
        "display": null,
        "attributes": [],
        "regex": "[a-z]{3}"
      },
      "PopCodeListType": {
        "shape": null,
        "display": null,
        "attributes": [],
        "multiple": true,
        "type": "PopCodeType"
      },
      "HostsSet": {
        "shape": null,
        "display": null,
        "attributes": [],
        "multiple": true,
        "type": "HostAndPort"
      },
      "CompareOperator": {
        "shape": null,
        "display": null,
        "attributes": [],
        "choice": [
          {
            "value": "==",
            "display": null
          }, {
            "value": "<",
            "display": null
          }, {
            "value": "<=",
            "display": null
          }, {
            "value": ">",
            "display": null
          }, {
            "value": ">=",
            "display": null
          }
        ]
      },
      "RegexType": {
        "shape": null,
        "display": null,
        "attributes": [],
        "regex": ".+"
      },
      "LiteralType": {
        "shape": null,
        "display": null,
        "attributes": [],
        "regex": "[-@_a-zA-Z0-9/~%:;=!,\\.\\+\\*'\\s]+"
      },
      "WildcardType": {
        "shape": null,
        "display": null,
        "attributes": [],
        "regex": "[-@_a-zA-Z0-9/~%:;=!,\\.\\+\\*'\\\\ ]+"
      },
      "MatchFieldName": {
        "shape": null,
        "display": null,
        "attributes": [],
        "regex": "[-_\\.a-zA-Z0-9]+"
      },
      "HostAndPort": {
        "shape": null,
        "display": null,
        "attributes": [],
        "regex": "([^:/\\s?#]+|\\[?((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))(%.+)?\\]?)(:[0-9]{1,5})?"
      },
      "HttpScheme": {
        "shape": null,
        "display": null,
        "attributes": [],
        "choice": [
          {
            "value": "http",
            "display": null
          }, {
            "value": "https",
            "display": null
          }
        ]
      },
      "HttpMethod": {
        "shape": null,
        "display": null,
        "attributes": [],
        "choice": [
          {
            "value": "GET",
            "display": null
          }, {
            "value": "HEAD",
            "display": null
          }, {
            "value": "POST",
            "display": null
          }, {
            "value": "OPTIONS",
            "display": null
          }, {
            "value": "PUT",
            "display": null
          }, {
            "value": "DELETE",
            "display": null
          }, {
            "value": "TRACE",
            "display": null
          }, {
            "value": "CONNECT",
            "display": null
          }
        ]
      },
      "HeaderTreatment": {
        "shape": null,
        "display": null,
        "attributes": [],
        "choice": [
          {
            "value": "pass",
            "display": null
          }, {
            "value": "overwrite",
            "display": null
          }, {
            "value": "if-missing",
            "display": null
          }, {
            "value": "remove",
            "display": null
          }
        ]
      },
      "MatchOrNot": {
        "shape": null,
        "display": null,
        "attributes": [],
        "choice": [
          {
            "value": "match",
            "display": null
          }, {
            "value": "nomatch",
            "display": null
          }
        ]
      },
      "RelativeTo": {
        "shape": null,
        "display": null,
        "attributes": [],
        "choice": [
          {
            "value": "root",
            "display": null
          }, {
            "value": "origin",
            "display": null
          }
        ]
      },
      "Platform": {
        "shape": null,
        "display": null,
        "attributes": [],
        "choice": [
          {
            "value": "http-small",
            "display": null
          }, {
            "value": "http-large",
            "display": null
          }, {
            "value": "fms",
            "display": null
          }, {
            "value": "hss",
            "display": null
          }, {
            "value": "adn",
            "display": null
          }
        ]
      },
      "CustomerId": {
        "shape": null,
        "display": null,
        "attributes": [],
        "regex": "[0-9A-F]{4,16}"
      },
      "TimeUnits": {
        "shape": null,
        "display": null,
        "attributes": [],
        "choice": [
          {
            "value": "off",
            "display": null
          }, {
            "value": "seconds",
            "display": null
          }, {
            "value": "minutes",
            "display": null
          }, {
            "value": "hours",
            "display": null
          }, {
            "value": "days",
            "display": null
          }, {
            "value": "weeks",
            "display": null
          }, {
            "value": "years",
            "display": null
          }
        ]
      },
      "ByteUnits": {
        "shape": null,
        "display": null,
        "attributes": [],
        "regex": "bytes|kilobytes|megabytes|gigabytes|terabytes|kibibytes|mebibytes|gibibytes|tebibytes"
      },
      "RuleStatus": {
        "shape": null,
        "display": null,
        "attributes": [],
        "choice": [
          {
            "value": "active",
            "display": null
          }, {
            "value": "pending",
            "display": null
          }
        ]
      },
      "CustOrigin": {
        "shape": null,
        "display": null,
        "attributes": [],
        "regex": "/80[0-9A-F]{4,16}/[^/]+/"
      },
      "EcOrigin": {
        "shape": null,
        "display": null,
        "attributes": [],
        "regex": "/[02][0-9A-F][0-9A-F]{4,16}/"
      },
      "IpSubnet": {
        "shape": null,
        "display": null,
        "attributes": [],
        "regex": "(([A-Fa-f0-9]{1,4}:){1,7}(:|[A-Fa-f0-9]{1,4})(/[0-9]{1,3})?|([A-Fa-f0-9]{1,4}:){1,6}:[A-Fa-f0-9]{1,4}(/[0-9]{1,3})?|([A-Fa-f0-9]{1,4}:){1,5}:([A-Fa-f0-9]{1,4}:)?[A-Fa-f0-9]{1,4}(/[0-9]{1,3})?|([A-Fa-f0-9]{1,4}:){1,4}:([A-Fa-f0-9]{1,4}:){0,2}[A-Fa-f0-9]{1,4}(/[0-9]{1,3})?|([A-Fa-f0-9]{1,4}:){1,3}:([A-Fa-f0-9]{1,4}:){0,3}[A-Fa-f0-9]{1,4}(/[0-9]{1,3})?|([A-Fa-f0-9]{1,4}:){1,2}:([A-Fa-f0-9]{1,4}:){0,4}[A-Fa-f0-9]{1,4}(/[0-9]{1,3})?|[A-Fa-f0-9]{1,4}::([A-Fa-f0-9]{1,4}:){0,5}[A-Fa-f0-9]{1,4}(/[0-9]{1,3})?|::([A-Fa-f0-9]{1,4}:){0,6}[A-Fa-f0-9]{1,4}(/[0-9]{1,3})?|(\\d{1,3}\\.){3}\\d{1,3}(/\\d{1,2})?)"
      },
      "IpSubnetList": {
        "shape": null,
        "display": null,
        "attributes": [],
        "multiple": true,
        "type": "IpSubnet"
      },
      "ContentType": {
        "shape": null,
        "display": null,
        "attributes": [],
        "regex": "[-\\+a-zA-Z0-9]+/[-\\+\\.a-zA-Z0-9]+"
      }
    },
    "typeMap": {
      "match.always": {
        "type": "MatchAlways",
        "display": null
      },
      "match.host": {
        "type": "MatchHost",
        "display": null
      },
      "match.var.literal": {
        "type": "MatchKeyToLiteral",
        "display": null
      },
      "match.var.wildcard": {
        "type": "MatchKeyToWildcard",
        "display": null
      },
      "match.var.regex": {
        "type": "MatchKeyToRegex",
        "display": null
      },
      "match.var.boolean": {
        "type": "MatchKeyToBoolean",
        "display": null
      },
      "match.var.integer": {
        "type": "MatchKeyToInteger",
        "display": null
      },
      "match.cookie.param": {
        "type": "MatchCookieParam",
        "display": null
      },
      "match.cookie.literal": {
        "type": "MatchKeyToLiteral",
        "display": null
      },
      "match.cookie.wildcard": {
        "type": "MatchKeyToWildcard",
        "display": null
      },
      "match.cookie.regex": {
        "type": "MatchKeyToRegex",
        "display": null
      },
      "match.url-path.literal": {
        "type": "MatchUrlPathLiteral",
        "display": null
      },
      "match.url-path.wildcard": {
        "type": "MatchUrlPathWildcard",
        "display": null
      },
      "match.url-path.regex": {
        "type": "MatchUrlPathRegex",
        "display": null
      },
      "match.url-path.extension": {
        "type": "MatchUrlPathExtension",
        "display": null
      },
      "match.url-path.filename": {
        "type": "MatchUrlPathFilename",
        "display": null
      },
      "match.url-path.directory": {
        "type": "MatchUrlPathDirectory",
        "display": null
      },
      "match.url-query.param": {
        "type": "MatchUrlQueryParam",
        "display": null
      },
      "match.url-query.literal": {
        "type": "MatchUrlQueryLiteral",
        "display": null
      },
      "match.url-query.wildcard": {
        "type": "MatchUrlQueryWildcard",
        "display": null
      },
      "match.url-query.regex": {
        "type": "MatchUrlQueryRegex",
        "display": null
      },
      "match.request-header.literal": {
        "type": "MatchRequestHeaderLiteral",
        "display": null
      },
      "match.request-header.wildcard": {
        "type": "MatchRequestHeaderWildcard",
        "display": null
      },
      "match.request-header.regex": {
        "type": "MatchRequestHeaderRegex",
        "display": null
      },
      "match.referring-domain": {
        "type": "MatchReferringDomain",
        "display": null
      },
      "match.customer-origin": {
        "type": "MatchCustorigin",
        "display": null
      },
      "match.cdn-origin": {
        "type": "MatchEcorigin",
        "display": null
      },
      "match.client-address": {
        "type": "MatchClientip",
        "display": null
      },
      "match.request-scheme": {
        "type": "MatchHttpScheme",
        "display": null
      },
      "match.request-method": {
        "type": "MatchHttpMethod",
        "display": null
      },
      "match.country": {
        "type": "MatchCountry",
        "display": null
      },
      "match.asn": {
        "type": "MatchASN",
        "display": null
      },
      "match.pop": {
        "type": "MatchPop",
        "display": null
      },
      "match.pop-regex": {
        "type": "MatchPopRegex",
        "display": null
      },
      "feature.comment": {
        "type": "CommentFeature",
        "display": null
      },
      "feature.ignore-origin-nocache": {
        "type": "IgnoreOriginNoCacheType",
        "display": null
      },
      "feature.ignore-unsatisfiable-ranges": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.log-querystring": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.bypass-cache": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.deny-access": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.complete-cache-fill": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.honor-nocache-request": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.refresh-zero-byte-files": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.external-ttl": {
        "type": "TimeIntervalFeature",
        "display": null
      },
      "feature.expires-treatment": {
        "type": "HeaderTreatmentFeature",
        "display": null
      },
      "feature.cache-control-treatment": {
        "type": "HeaderTreatmentFeature",
        "display": null
      },
      "feature.cache-queries": {
        "type": "CacheQueriesFeature",
        "display": null
      },
      "feature.max-stale": {
        "type": "TimeIntervalFeature",
        "display": null
      },
      "feature.token-ignore-url-case": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.token-auth": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.token-auth-denial-code": {
        "type": "TokenAuthDenialCodeFeature",
        "display": null
      },
      "feature.compress-filetypes": {
        "type": "ContentTypeListFeature",
        "display": null
      },
      "feature.custom-log-field-1": {
        "type": "LogFieldFeature",
        "display": null
      },
      "feature.set-client-ip-header": {
        "type": "TrueClientIPType",
        "display": null
      },
      "feature.set-request-header": {
        "type": "SetHeaderFeature",
        "display": null
      },
      "feature.set-response-header": {
        "type": "SetHeaderFeature",
        "display": null
      },
      "feature.bwlimit": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.optimize-content": {
        "type": "PagespeedFeature",
        "display": null
      },
      "feature.instantiate-optimize-content": {
        "type": "PagespeedConfig",
        "display": null
      },
      "feature.debug-headers": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.logless-billing": {
        "type": "LoglessFeature",
        "display": null
      },
      "feature.stale-while-revalidate": {
        "type": "TimeIntervalFeature",
        "display": null
      },
      "feature.revalidate-while-stale": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.stale-if-error": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.cacheable-status-codes": {
        "type": "HttpStatusCodeListValue",
        "display": null
      },
      "feature.default-internal-maxage": {
        "type": "TimeIntervalFeature",
        "display": null
      },
      "feature.force-internal-maxage": {
        "type": "TimeIntervalFeature",
        "display": null
      },
      "feature.user-debug-request-header": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.origin-failover-codes": {
        "type": "HttpStatusCodeListValue",
        "display": null
      },
      "feature.iproxy-failover-codes": {
        "type": "HttpStatusCodeListValue",
        "display": null
      },
      "feature.max-failovers": {
        "type": "UnsignedShortValue",
        "display": null
      },
      "feature.max-request-bytes": {
        "type": "BytesType",
        "display": null
      },
      "feature.ectoken.query-param": {
        "type": "ECTokenQueryParam",
        "display": null
      },
      "feature.user-variable": {
        "type": "UserVariableType",
        "display": null
      },
      "feature.connection-bandwidth-throttling": {
        "type": "ConnBWThrottlingType",
        "display": null
      },
      "feature.cache-prevalidate": {
        "type": "TimeIntervalFeature",
        "display": null
      },
      "feature.allow-error-failover": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.follow-redirects": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.gzip-validation": {
        "type": "UnsignedIntValue",
        "display": null
      },
      "feature.origin-ssl-cipher-list": {
        "type": "SSLCipherListType",
        "display": null
      },
      "feature.ectoken.denial-code": {
        "type": "HttpStatusCodeValue",
        "display": null
      },
      "feature.proxy-max-backlog-size": {
        "type": "UnsignedIntValue",
        "display": null
      },
      "feature.proxy-exponential-backoff": {
        "type": "ProxyExpBackoffType",
        "display": null
      },
      "feature.cache-methods": {
        "type": "CacheMethodsType",
        "display": null
      },
      "feature.max-cacheable-request-body": {
        "type": "BytesType",
        "display": null
      },
      "feature.proxy-connection-timeouts": {
        "type": "ProxyConnTimeoutsType",
        "display": null
      },
      "feature.bloom-filter-enable": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.proxy-special-headers": {
        "type": "HttpHeaderListValue",
        "display": null
      },
      "feature.send-age-header": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.livestats2.report-code": {
        "type": "ReportCodeType",
        "display": null
      },
      "feature.h264-streaming2.extensions": {
        "type": "FileExtensionListValue",
        "display": null
      },
      "feature.continue-cache-fill": {
        "type": "ContinueCacheFillType",
        "display": null
      },
      "feature.quick-response-raw": {
        "type": "QuickResponseType",
        "display": null
      },
      "feature.quick-response-clean": {
        "type": "QuickResponseType",
        "display": null
      },
      "feature.http-log-retrieval": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.proxy-max-keep-alive-requests": {
        "type": "UnsignedIntValue",
        "display": null
      },
      "feature.allowed-backend-tags": {
        "type": "BETagListValue",
        "display": null
      },
      "feature.cache-include-http-host-in-key": {
        "type": "BooleanFeature",
        "display": null
      },
      "feature.url-user-rewrite": {
        "type": "RegexRewriteType",
        "display": null
      },
      "feature.rewrite-cache-key": {
        "type": "RegexRewriteType",
        "display": null
      },
      "feature.url-redirect": {
        "type": "RegexRedirectType",
        "display": null
      },
      "feature.waf-instance": {
        "type": "WAFType",
        "display": null
      }
    }
  };

  (typeof exports !== "undefined" && exports !== null ? exports : this).rule_template = rule_template;

}).call(this);
