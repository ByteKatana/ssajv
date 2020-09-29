import React, { useState } from 'react'

//react-bootstrap
import { ButtonGroup, ToggleButton, OverlayTrigger, Tooltip } from 'react-bootstrap'

//Utils
import { LastRunOutCome } from '../../utils/last-run-outcome.utils'

export const LastOutcomeFilter = (props) => {
    const [filterValue, setFilterValue] = useState('')


    const filters = [
        { name: 'All', value: '' },
        { name: 'Succeeded', value: '1' },
        { name: 'Failed', value: '0' },
        { name: 'Retry', value: '2' },
        { name: 'Cancel', value: '3' },
        { name: 'In progress', value: '4' },
        { name: 'Unknown', value: '5' },
      ]

      const handleChange = (e) => {
        setFilterValue(e.currentTarget.value)
        props.handleChange(e)
      }

      return (
          <>
          <b>Last Outcome Filter: </b>
            <ButtonGroup toggle style={{marginLeft:'-2%', marginBottom: '5px'}}>
                {filters.map((filter, key) => (
                    <ToggleButton 
                    key={key}
                    type="radio"
                    variant="secondary"
                    name="filter"
                    size="sm"
                    value={filter.value}
                    checked={filterValue === filter.value}
                    onChange={e => handleChange(e)}
                    >
                    {filter.value === '' ? <b className={filterValue == '' ? 'text-black' : 'text-secondary'}>{filter.name}</b> :
                       <OverlayTrigger placement="right" delay={{ show: 250, hide: 250 }} overlay={<Tooltip id="tooltip-disabled">{filter.name}</Tooltip>}> 
                            <span className="d-inline-block">
                                <LastRunOutCome filterVal={filterValue} outcome={filter.value} />
                            </span>
                        </OverlayTrigger> }
                    </ToggleButton>
                ))}
            </ButtonGroup>
          </>
      )

}

export default LastOutcomeFilter