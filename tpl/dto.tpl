<?php

namespace {{{data.namespace}}};

/**
 * {{{data.description}}}
 * 
 * Class {{data.definitionName}}
 * @package {{{data.namespace}}}
 */

{{#data.extends}}
class {{{data.definitionName}}} extends {{{data.extends}}}
{{/data.extends}}
{{^data.extends}}
class {{{data.definitionName}}} implements \JsonSerializable  
{{/data.extends}}
{
    {{#data.properties}}
    /**
     * @var {{{type}}} {{{description}}} 
     */
    protected ${{name}}; 

    /**
     * Получает {{{description}}}
     *
     * @return {{{type}}}
     */
    public function get{{camelCase}}()
    {{=<% %>=}}
    {
        return $this-><%name%>;
    }
    /**
     * Получает {{{description}}}
     *
     * @param {{{type}}} {{{description}}}
     * @return $this
     */
    public function set{{camelCase}}($value)
    {{=<% %>=}}
    {
        $this-><%name$> = $value;
        return $this;
    }
    <%={{ }}=%>

    {{/data.properties}}

    {{^data.extends}}
    function jsonSerialize()
    {
        return $this;
    }  
    {{/data.extends}}
}