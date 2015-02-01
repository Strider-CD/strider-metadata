app.controller('MetadataCtrl', ['$scope', function ($scope) {
  $scope.$watch('configs[branch.name].metadata.config', function (value) {
    $scope.config = value || {};
  });
  $scope.saving = false;
  $scope.save = function () {
    $scope.saving = true;
    $scope.pluginConfig('metadata', $scope.config, function () {
      $scope.saving = false;
    });
  };
  $scope.del = function (key) {
    delete $scope.config[key];
    $scope.save();
  };
  $scope.add = function () {
    if ($scope.newkey) {
      $scope.config[$scope.newkey] = $scope.newvalue;
      $scope.newkey = $scope.newvalue = '';
      $scope.save();
    } else {
      $scope.success('Plugin order on branch ' + branch.name + ' saved.', true);
    }
  }

  $scope.exampleJSON = JSON.stringify(example, null, 4);

  var deep_value = function(obj, path){
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
      obj = obj[path[i]];
    };
    return obj;
  };


  $scope.convert = function (input) {
    if (!input) return false;
    var out = deep_value(example, input)
    if (typeof out === "undefined") return '(not in sample data)';
    return out;
  };

  $scope.valid = function () {
    return $scope.newkey && $scope.newkey.length > 0 && $scope.convert($scope.newvalue)
  };

  $scope.preview = function (input) {
    var out = $scope.convert(input)
    if (out) return out;
    else return "";
  };
}]);

var example = {
  "__v": 0,
  "_id": "53e2e5d079c1eab0a100000f",
  "type": "TEST_AND_DEPLOY",
  "user_id": "53e27d0e9e55a64b7a00000d",
  "project": {
    "_id": "53e2a0aa5cc7484e8b00014a",
    "name": "keyvanfatehi/dew",
    "display_name": "keyvanfatehi/dew",
    "display_url": "https://github.com/keyvanfatehi/dew",
    "creator": {
      "_id": "53e27d0e9e55a64b7a00000d",
      "account_level": 1,
      "hash": "",
      "salt": "",
      "created": "2014-08-06T19:07:58.100Z",
      "email": "test@test.com",
      "__v": 1,
      "jobs": [],
      "projects": [],
    },
    "__v": 2,
    "provider": {
      "id": "github",
      "account": "175305",
      "repo_id": "22426766",
      "config": {
        "url": "git://github.com/keyvanfatehi/dew.git",
        "owner": "keyvanfatehi",
        "repo": "dew",
        "auth": {
          "type": "https"
        },
        "secret": ""
      }
    },
    "branches": [
      {
      "name": "master",
      "pubkey": "",
      "privkey": "",
      "_id": "53e2a0aa5cc7484e8b00014c",
      "runner": {
        "id": "simple-runner",
        "config": {
          "pty": false
        }
      },
      "plugins": [
        {
        "id": "node",
        "enabled": true,
        "config": {
          "globals": [],
          "test": "npm test",
          "caching": "loose",
          "runtime": "whatever"
        },
        "_id": "53e2e5c779c1eab0a100000e",
        "showStatus": true
      },
      {
        "id": "metadata",
        "enabled": true,
        "_id": "53e2e5c779c1eab0a100000d",
        "showStatus": true
      }
      ],
      "deploy_on_green": true,
      "mirror_master": false,
      "active": true
    },
    {
      "name": "*",
      "_id": "53e2a0aa5cc7484e8b00014b",
      "plugins": [],
      "deploy_on_green": true,
      "mirror_master": true,
      "active": true
    }
    ],
    "prefetch_config": true,
    "public": false
  },
  "ref": {
    "branch": "master"
  },
  "created": "2014-08-07T02:34:56.848Z",
  "errored": false,
  "warnings": [],
  "phases": {
    "cleanup": {
      "commands": []
    },
    "deploy": {
      "commands": []
    },
    "test": {
      "commands": []
    },
    "prepare": {
      "commands": []
    },
    "environment": {
      "commands": []
    }
  },
  "trigger": {
    "type": "manual",
    "message": "Manually Redeploying",
    "timestamp": "2014-08-07T02:34:56.848Z",
    "source": {
      "page": "unknown",
      "type": "UI"
    },
    "author": {
      "id": "53e27d0e9e55a64b7a00000d",
      "email": "test@test.com",
      "image": "https://secure.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452"
    }
  },
  "providerConfig": {
    "secret": "adf743d28729594eb77217a3c24b85493688beaa889431605d7cc106794d66a0",
    "auth": {
      "type": "https"
    },
    "repo": "dew",
    "owner": "keyvanfatehi",
    "url": "git://github.com/keyvanfatehi/dew.git"
  },
  "fromStriderJson": true
};
