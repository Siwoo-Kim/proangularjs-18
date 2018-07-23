
angular.module("customDirectives",
    [
        "customServices",
    ])
    .directive("triButtons", function (logService) {
        return {
            scope: {
                counter: "=counter"
            },
            link: function (scope, element, attrs) {
                element.on("click", function (event) {
                    logService.log(event.target.innerText + " clicked!");
                    scope.$apply(function () {
                        scope.counter++;
                    })
                })
            }
        }
    });