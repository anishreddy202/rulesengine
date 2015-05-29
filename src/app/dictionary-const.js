/*
angular.module('rules').constant('DICTIONARY', {
  MATCHES:[
  {
    'tag': 'match.always',
    'name': 'Always',
    'category_id': 10,
    'attributes': []
  },
  {
    'tag': 'match.asn',
    'name': 'AS Number',
    'category_id': 7,
    'attributes': [
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.cdn-origin',
    'name': 'CDN Origin',
    'category_id': 8,
    'attributes': [
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 0,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.client-address',
    'name': 'Client IP Address',
    'category_id': 10,
    'attributes': [
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 1,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.cookie.param',
    'name': 'Cookie Parameter',
    'category_id': 5,
    'attributes': [
      {
        'name': 'key',
        'key': 'key',
        'ordinal': 1,
        'options': []
      },
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 4,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 5,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.cookie.regex',
    'name': 'Cookie Parameter Regex',
    'category_id': 5,
    'attributes': [
      {
        'name': 'key',
        'key': 'key',
        'ordinal': 1,
        'options': []
      },
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 4,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 5,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.country',
    'name': 'Country',
    'category_id': 7,
    'attributes': [
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.customer-origin',
    'name': 'Customer Origin',
    'category_id': 8,
    'attributes': [
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 0,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.geo.boolean',
    'name': 'GEO Boolean',
    'category_id': 7,
    'attributes': [
      {
        'name': 'key',
        'key': 'key',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 1,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.geo.integeer',
    'name': 'GEO Integer',
    'category_id': 7,
    'attributes': [
      {
        'name': 'key',
        'key': 'key',
        'ordinal': 0,
        'options': [
          {
            'key': 'geo_latitude',
            'name': 'Latitude'
          },
          {
            'key': 'geo_longitude',
            'name': 'Longitude'
          }
        ]
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 1,
        'options': []
      },
      {
        'name': 'compare',
        'key': 'compare',
        'ordinal': 2,
        'options': [
          {
            'key': '<=',
            'name': '<='
          },
          {
            'key': '=',
            'name': '='
          },
          {
            'key': '>',
            'name': '>'
          },
          {
            'key': '>=',
            'name': '>='
          }
        ]
      }
    ]
  },
  {
    'tag': 'match.geo.literal',
    'name': 'GEO Literal',
    'category_id': 7,
    'attributes': [
      {
        'name': 'key',
        'key': 'key',
        'ordinal': 0,
        'options': [
          {
            'key': 'geo_as_number',
            'name': 'AS Number'
          },
          {
            'key': 'geo_country',
            'name': 'Country'
          },
          {
            'key': 'geo_dma_code',
            'name': 'DMA Code'
          },
          {
            'key': 'geo_metro_code',
            'name': 'Metro Code'
          },
          {
            'key': 'geo_region_code',
            'name': 'Region Code'
          }
        ]
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 1,
        'options': []
      },
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 2,
        'options': [
          {
            'key': 'geo_matches',
            'name': 'Matches'
          },
          {
            'key': 'geo_does_not_matches',
            'name': 'Does Not Matches'
          }
        ]
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': [
          {
            'key': 'true',
            'name': 'True'
          },
          {
            'key': 'false',
            'name': 'False'
          }
        ]
      }
    ]
  },
  {
    'tag': 'match.geo.regex',
    'name': 'GEO Regex',
    'category_id': 7,
    'attributes': [
      {
        'name': 'key',
        'key': 'key',
        'ordinal': 0,
        'options': [
          {
            'key': 'geo_city_name',
            'name': 'City Name'
          }
        ]
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 1,
        'options': []
      },
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.geo.wildcard',
    'name': 'GEO Wildcard',
    'category_id': 7,
    'attributes': [
      {
        'name': 'key',
        'key': 'key',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 1,
        'options': []
      },
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.host',
    'name': 'Edge Cname',
    'category_id': 10,
    'attributes': [
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 0,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.referring-domain',
    'name': 'Referring Domain',
    'category_id': 10,
    'attributes': [
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.request-header.literal',
    'name': 'Request Header Literal',
    'category_id': 4,
    'attributes': [
      {
        'name': 'Name',
        'key': 'name',
        'ordinal': 1,
        'options': []
      },
      {
        'name': 'Result',
        'key': 'result',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'Value',
        'key': 'value',
        'ordinal': 4,
        'options': []
      },
      {
        'name': 'Ignore Case',
        'key': 'ignore-case',
        'ordinal': 5,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.request-header.regex',
    'name': 'Request Header Regex',
    'category_id': 4,
    'attributes': [
      {
        'name': 'name',
        'key': 'name',
        'ordinal': 1,
        'options': []
      },
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 4,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 5,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.request-header.wildcard',
    'name': 'Request Header Wildcard',
    'category_id': 4,
    'attributes': [
      {
        'name': 'name',
        'key': 'name',
        'ordinal': 1,
        'options': []
      },
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 4,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 5,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.request-method',
    'name': 'Request Method',
    'category_id': 4,
    'attributes': [
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 0,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.request-scheme',
    'name': 'Request Scheme',
    'category_id': 4,
    'attributes': [
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 0,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.url-path.directory',
    'name': 'URL Path Directory',
    'category_id': 9,
    'attributes': [
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': []
      },
      {
        'name': 'relative-to',
        'key': 'relative-to',
        'ordinal': 5,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.url-path.extension',
    'name': 'URL Path Extension',
    'category_id': 9,
    'attributes': [
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.url-path.filename',
    'name': 'URL Path Filename',
    'category_id': 9,
    'attributes': [
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.url-path.literal',
    'name': 'URL Path Literal',
    'category_id': 9,
    'attributes': [
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': []
      },
      {
        'name': 'relative-to',
        'key': 'relative-to',
        'ordinal': 5,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.url-path.regex',
    'name': 'URL Path Regex',
    'category_id': 9,
    'attributes': [
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.url-path.wildcard',
    'name': 'URL Path Wildcard',
    'category_id': 9,
    'attributes': [
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': []
      },
      {
        'name': 'relative-to',
        'key': 'relative-to',
        'ordinal': 5,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.url-query.literal',
    'name': 'URL Query Literal',
    'category_id': 9,
    'attributes': [
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.url-query.param',
    'name': 'URL Query Parameter',
    'category_id': 9,
    'attributes': [
      {
        'name': 'key',
        'key': 'key',
        'ordinal': 1,
        'options': []
      },
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 4,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 5,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.url-query.regex',
    'name': 'URL Query Regex',
    'category_id': 9,
    'attributes': [
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.url-query.wildcard',
    'name': 'URL Query Wildcard',
    'category_id': 9,
    'attributes': [
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.var.boolean',
    'name': 'Device Boolean',
    'category_id': 6,
    'attributes': [
      {
        'name': 'key',
        'key': 'key',
        'ordinal': 0,
        'options': [
          {
            'key': 'wurfl_cap_is_wireless_device',
            'name': 'Is Wireless Device'
          },
          {
            'key': 'wurfl_cap_is_tablet',
            'name': 'Is Tablet'
          },
          {
            'key': 'wurfl_cap_image_inlining',
            'name': 'Image Inlining'
          },
          {
            'key': 'wurfl_cap_dual_orientation',
            'name': 'Dual Orientation'
          },
          {
            'key': 'wurfl_cap_progressive_download',
            'name': 'Progressive Download'
          },
          {
            'key': 'wurfl_cap_is_smarttv',
            'name': 'Is Smart TV'
          },
          {
            'key': 'wurfl_vcap_is_android',
            'name': 'Is Android'
          },
          {
            'key': 'wurfl_vcap_is_ios',
            'name': 'Is IOS'
          },
          {
            'key': 'wurfl_cap_is_smartphone',
            'name': 'Is Smartphone'
          }
        ]
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 1,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.var.integer',
    'name': 'Device Integer',
    'category_id': 6,
    'attributes': [
      {
        'name': 'key',
        'key': 'key',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'compare',
        'key': 'compare',
        'ordinal': 1,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.var.literal',
    'name': 'Device Literal',
    'category_id': 6,
    'attributes': [
      {
        'name': 'key',
        'key': 'key',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 1,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.var.regex',
    'name': 'Device Regex',
    'category_id': 6,
    'attributes': [
      {
        'name': 'key',
        'key': 'key',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 1,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': []
      }
    ]
  },
  {
    'tag': 'match.var.wildcard',
    'name': 'Device Wildcard',
    'category_id': 6,
    'attributes': [
      {
        'name': 'key',
        'key': 'key',
        'ordinal': 0,
        'options': []
      },
      {
        'name': 'result',
        'key': 'result',
        'ordinal': 1,
        'options': []
      },
      {
        'name': 'value',
        'key': 'value',
        'ordinal': 2,
        'options': []
      },
      {
        'name': 'ignore-case',
        'key': 'ignore-case',
        'ordinal': 3,
        'options': []
      }
    ]
  }],
  FEATURES:[
    {
      'tag': 'feature.allowed-backend-tags',
      'name': 'Origin Tags',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 1,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.allow-error-failover',
      'name': 'Customer Origin Failover on TCP Error',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.bloom-filter-enable',
      'name': 'Second Hit Caching',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.bwlimit',
      'name': 'Bandwidth Parameters',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.bypass-cache',
      'name': 'Bypass Cache',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.cacheable-status-codes',
      'name': 'Set Cacheable Status Codes',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.cache-control-treatment',
      'name': 'Cache-Control Header Treatment',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.cache-fill-check-downstream-range',
      'name': 'Cache Fill Check Downstream Range',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.cache-fill-max-rate',
      'name': 'Cache Fill Max Rate',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.cache-fill-spawn-subrequest-for-miss',
      'name': 'Cache Fill Spawn Subrequest for miss',
      'category_id': 13,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.cache-fill-wait-msecs',
      'name': 'Cache Fill Wait',
      'category_id': 13,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        },
        {
          'name': 'units',
          'key': 'units',
          'ordinal': 1,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.cache-methods',
      'name': 'Cacheable HTTP Methods',
      'category_id': 13,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.cache-prevalidate',
      'name': 'Prevalidate Cached Content',
      'category_id': 13,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        },
        {
          'name': 'units',
          'key': 'units',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.cache-queries',
      'name': 'Cache-Key Query String',
      'category_id': 13,
      'attributes': [
        {
          'name': 'mode',
          'key': 'mode',
          'ordinal': 0,
          'options': []
        },
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 2,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.comment',
      'name': 'Comment',
      'category_id': 13,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.complete-cache-fill',
      'name': 'Complete Cache Fill',
      'category_id': 13,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.compress-filetypes',
      'name': 'Compress File Types',
      'category_id': 13,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.connection-bandwidth-throttling',
      'name': 'Bandwidth Throttling',
      'category_id': 13,
      'attributes': [
        {
          'name': 'kbytes-per-second',
          'key': 'kbytes-per-second',
          'ordinal': 2,
          'options': []
        },
        {
          'name': 'prebuf-seconds',
          'key': 'prebuf-seconds',
          'ordinal': 4,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.continue-cache-fill',
      'name': 'Partial Cache Sharing',
      'category_id': 13,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.custom-log-field-1',
      'name': 'Custom Log Field 1',
      'category_id': 14,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 1,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.default-internal-maxage',
      'name': 'Default Internal Max-Age',
      'category_id': 14,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 2,
          'options': []
        },
        {
          'name': 'units',
          'key': 'units',
          'ordinal': 3,
          'options': []
        },
        {
          'name': 'status',
          'key': 'status',
          'ordinal': 1,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.deny-access',
      'name': 'Deny Access (403)',
      'category_id': 14,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.ectoken.query-param',
      'name': 'Token Auth Parameter',
      'category_id': 14,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 1,
          'options': []
        },
        {
          'name': 'enable',
          'key': 'enable',
          'ordinal': 2,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.expires-treatment',
      'name': 'Expires Header Treatment',
      'category_id': 14,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.external-ttl',
      'name': 'External Max-Age',
      'category_id': 14,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        },
        {
          'name': 'units',
          'key': 'units',
          'ordinal': 1,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.follow-redirects',
      'name': 'Follow Redirects',
      'category_id': 14,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.force-internal-maxage',
      'name': 'Force Internal Max-Age',
      'category_id': 14,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 2,
          'options': []
        },
        {
          'name': 'units',
          'key': 'units',
          'ordinal': 3,
          'options': []
        },
        {
          'name': 'status',
          'key': 'status',
          'ordinal': 1,
          'options': [
            {
              'key': '200',
              'name': '200'
            },
            {
              'key': '203',
              'name': '203'
            },
            {
              'key': '300',
              'name': '300'
            },
            {
              'key': '301',
              'name': '301'
            },
            {
              'key': '302',
              'name': '302'
            },
            {
              'key': '305',
              'name': '305'
            },
            {
              'key': '307',
              'name': '307'
            },
            {
              'key': '400',
              'name': '400'
            },
            {
              'key': '401',
              'name': '401'
            },
            {
              'key': '402',
              'name': '402'
            },
            {
              'key': '403',
              'name': '403'
            },
            {
              'key': '404',
              'name': '404'
            },
            {
              'key': '405',
              'name': '405'
            },
            {
              'key': '406',
              'name': '406'
            },
            {
              'key': '407',
              'name': '407'
            },
            {
              'key': '408',
              'name': '408'
            },
            {
              'key': '409',
              'name': '409'
            },
            {
              'key': '410',
              'name': '410'
            },
            {
              'key': '411',
              'name': '411'
            },
            {
              'key': '412',
              'name': '412'
            },
            {
              'key': '413',
              'name': '413'
            },
            {
              'key': '414',
              'name': '414'
            },
            {
              'key': '415',
              'name': '415'
            },
            {
              'key': '416',
              'name': '416'
            },
            {
              'key': '417',
              'name': '417'
            },
            {
              'key': '500',
              'name': '500'
            },
            {
              'key': '501',
              'name': '501'
            },
            {
              'key': '502',
              'name': '502'
            },
            {
              'key': '503',
              'name': '503'
            },
            {
              'key': '504',
              'name': '504'
            },
            {
              'key': '505',
              'name': '505'
            }
          ]
        }
      ]
    },
    {
      'tag': 'feature.gzip-validation',
      'name': 'Compressed Content Validation',
      'category_id': 14,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 1,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.h264-streaming2.extensions',
      'name': 'H.264 Support (HTTP Progressive Download)',
      'category_id': 14,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 1,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.honor-nocache-request',
      'name': 'Honor No-Cache Request',
      'category_id': 14,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.http-log-retrieval',
      'name': 'Raw Log File Retrieval',
      'category_id': 14,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.ignore-origin-nocache',
      'name': 'Ignore Origin No-Cache',
      'category_id': 14,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.ignore-unsatisfiable-ranges',
      'name': 'Ignore Unsatisfiable Ranges',
      'category_id': 14,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.instantiate-optimize-content',
      'name': 'Edge Optimizer - Instantiate Configuration',
      'category_id': 14,
      'attributes': []
    },
    {
      'tag': 'feature.livestats2.report-code',
      'name': 'Set Report Code',
      'category_id': 14,
      'attributes': [
        {
          'name': 'code',
          'key': 'code',
          'ordinal': 2,
          'options': []
        },
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 3,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.log-querystring',
      'name': 'Log Query String',
      'category_id': 14,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.max-cacheable-request-body',
      'name': 'Cacheable Request Body Size',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        },
        {
          'name': 'units',
          'key': 'units',
          'ordinal': 1,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.max-request-bytes',
      'name': 'Maximum POST Request Size',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 1,
          'options': []
        },
        {
          'name': 'units',
          'key': 'units',
          'ordinal': 2,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.max-stale',
      'name': 'Internal Max-Stale',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 2,
          'options': []
        },
        {
          'name': 'units',
          'key': 'units',
          'ordinal': 3,
          'options': []
        },
        {
          'name': 'status',
          'key': 'status',
          'ordinal': 1,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.optimize-content',
      'name': 'Edge Optimizer',
      'category_id': 12,
      'attributes': []
    },
    {
      'tag': 'feature.proxy-max-keep-alive-requests',
      'name': 'Maximum Keep-Alive Requests',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 1,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.proxy-special-headers',
      'name': 'Proxy Special Headers',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 1,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.refresh-zero-byte-files',
      'name': 'Refresh Zero-Byte Cache Files',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.rewrite-cache-key',
      'name': 'Cache-Key Rewrite',
      'category_id': 12,
      'attributes': [
        {
          'name': 'pattern',
          'key': 'pattern',
          'ordinal': 1,
          'options': []
        },
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 3,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.send-age-header',
      'name': 'Age Response Header',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.set-client-ip-header',
      'name': 'Set Client IP Custom Header',
      'category_id': 12,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        },
        {
          'name': 'key',
          'key': 'key',
          'ordinal': 2,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.set-request-header',
      'name': 'Modify Client Request Header',
      'category_id': 12,
      'attributes': [
        {
          'name': 'action',
          'key': 'action',
          'ordinal': 0,
          'options': []
        },
        {
          'name': 'key',
          'key': 'key',
          'ordinal': 2,
          'options': []
        },
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 4,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.set-response-header',
      'name': 'Modify Client Response Header',
      'category_id': 13,
      'attributes': [
        {
          'name': 'action',
          'key': 'action',
          'ordinal': 0,
          'options': []
        },
        {
          'name': 'key',
          'key': 'key',
          'ordinal': 2,
          'options': []
        },
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 4,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.stale-if-error',
      'name': 'Stale Content Delivery on Error',
      'category_id': 13,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.stale-while-revalidate',
      'name': 'Stale While Revalidate',
      'category_id': 13,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        },
        {
          'name': 'units',
          'key': 'units',
          'ordinal': 1,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.token-auth',
      'name': 'Token Auth',
      'category_id': 13,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.token-auth-denial-code',
      'name': 'Token Auth Denial Code',
      'category_id': 13,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        },
        {
          'name': 'header-name',
          'key': 'header-name',
          'ordinal': 2,
          'options': []
        },
        {
          'name': 'header-value',
          'key': 'header-value',
          'ordinal': 4,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.token-ignore-url-case',
      'name': 'Token Auth Ignore URL Case',
      'category_id': 13,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.url-redirect',
      'name': 'URL Redirect',
      'category_id': 13,
      'attributes': [
        {
          'name': 'code',
          'key': 'code',
          'ordinal': 1,
          'options': []
        },
        {
          'name': 'pattern',
          'key': 'pattern',
          'ordinal': 3,
          'options': []
        },
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 5,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.url-user-rewrite',
      'name': 'URL Rewrite',
      'category_id': 13,
      'attributes': [
        {
          'name': 'pattern',
          'key': 'pattern',
          'ordinal': 1,
          'options': []
        },
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 3,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.user-debug-request-header',
      'name': 'Debug Cache Response Headers',
      'category_id': 13,
      'attributes': [
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 0,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.user-variable',
      'name': 'User Variable',
      'category_id': 13,
      'attributes': [
        {
          'name': 'name',
          'key': 'name',
          'ordinal': 1,
          'options': []
        },
        {
          'name': 'value',
          'key': 'value',
          'ordinal': 3,
          'options': []
        }
      ]
    },
    {
      'tag': 'feature.waf-instance',
      'name': 'Web Application Firewall',
      'category_id': 13,
      'attributes': [
        {
          'name': 'key',
          'key': 'key',
          'ordinal': 1,
          'options': []
        }
      ]
    }
  ]
});
*/
