<?php

namespace {{data.namespace}};

/**
 * {{data.description}}
 * 
 * Class {{data.definitionName}}
 * @package {{data.namespace}}
 */

{{#data.extends}}
class {{data.definitionName}} extends {{data.extends}}
{{/data.extends}}
{{^data.extends}}
class {{data.definitionName}} implements \JsonSerializable  
{{/data.extends}}
{
    {{#data.properties}}
    /**
     * @var {{type}} {{description}} 
     */
    public ${{name}}; 
    {{/data.properties}}

    {{^data.extends}}
    function jsonSerialize()
    {
        return $this;
    }  
    {{/data.extends}}
}