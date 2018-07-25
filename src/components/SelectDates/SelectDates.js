// @flow
import React, { PureComponent } from 'react'
import type { Element } from 'react'
import type { DateRange } from 'actions/types'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

export type DateFormProps = {|
  ...DateRange,
  onSelectDay: (input: DateRange) => void,
  children: Element<*> | Element<*>[],
|}

export default class SelectDates extends PureComponent<DateFormProps> {
  handleDayClick = (day: Date): void => {
    const range = DateUtils.addDayToRange(day, {
      from: this.props.from,
      to: this.props.to,
    })
    this.props.onSelectDay(range)
  }

  handleResetClick = (): void => this.props.onSelectDay({
    from: null,
    to: null,
  })

  render() {
    const { from, to } = this.props
    const modifiers = { from, to }
    return (
      <div>
        <p>
          {(from || to) &&
            `Selected ${from ? `from ${from.toLocaleDateString()}` : ''} ${to ? `to
                ${to.toLocaleDateString()}` : ''}`}
          {(from || to) && (
            <button className="link" onClick={this.handleResetClick}>
                Reset
            </button>
          )}
        </p>
        <DayPicker
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
        {this.props.children}
      </div>
    )
  }
}
