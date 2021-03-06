import { filter, values } from 'lodash'
import { Weather as WeatherModel } from 'models'
import { CustomInput, FormGroup, Label } from 'reactstrap'
import { Section, Toggle } from './station'

const Backgrounds = {
  unknown: 'linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)'
}

const NO_WIND = 'no wind'

interface WeatherProp {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const CloudCoverage = ({ value, onChange }: WeatherProp) => (
  <FormGroup>
    <Label for="cloud-coverage">Cloud Coverage</Label>
    <CustomInput
      type="select"
      id="cloud-coverage"
      name="cloud-coverage"
      value={value}
      onChange={onChange}
    >
      <option disabled hidden value="" />
      {['0%', '1% - 25%', '26% - 50%', '51% - 100%'].map((v) => (
        <option key={v} value={v}>
          {v}
        </option>
      ))}
    </CustomInput>
  </FormGroup>
)

export const WindDirection = ({ value, onChange }: WeatherProp) => (
  <FormGroup>
    <Label for="wind-direction">Wind Direction</Label>
    <CustomInput
      type="select"
      id="wind-direction"
      name="wind-direction"
      value={value}
      onChange={onChange}
    >
      <option disabled hidden value="" />
      {[
        'No Wind',
        'North',
        'North-East',
        'East',
        'South-East',
        'South',
        'South-West',
        'West',
        'North-West'
      ].map((v) => (
        <option key={v} value={v}>
          {v}
        </option>
      ))}
    </CustomInput>
  </FormGroup>
)

export const WindSpeed = ({ value, onChange }: WeatherProp) => (
  <FormGroup>
    <Label for="wind-speed">Wind Speed</Label>
    <CustomInput
      type="select"
      id="wind-speed"
      name="wind-speed"
      value={value}
      onChange={onChange}
    >
      <option disabled hidden value="" />
      <option value={NO_WIND}>No Wind</option>
      {['1-5', '6-10', '11-15', '16-20', '21+'].map((v) => (
        <option key={v} value={v}>
          {v} Knots
        </option>
      ))}
    </CustomInput>
  </FormGroup>
)

export const SeaState = ({ value, onChange }: WeatherProp) => (
  <FormGroup>
    <Label for="sea-state">Sea State</Label>
    <CustomInput
      type="select"
      id="sea-state"
      name="sea-state"
      value={value}
      onChange={onChange}
    >
      <option disabled hidden value="" />
      {[
        'Glassy to calm',
        'Small ripples',
        'Small waves',
        'Moderate waves',
        'High waves'
      ].map((v) => (
        <option key={v} value={v}>
          {v}
        </option>
      ))}
    </CustomInput>
  </FormGroup>
)

export const Tide = ({ value, onChange }: WeatherProp) => (
  <FormGroup>
    <Label for="tide">Tide</Label>
    <CustomInput
      type="select"
      id="tide"
      name="tide"
      value={value}
      onChange={onChange}
    >
      <option disabled hidden value="" />
      {['Slack low', 'Low', 'Ebbing', 'Slack high', 'High', 'Flooding'].map(
        (v) => (
          <option key={v} value={v}>
            {v}
          </option>
        )
      )}
    </CustomInput>
  </FormGroup>
)

interface Props {
  weather: WeatherModel
  onChange: (weather: WeatherModel) => void
  className?: string
  open: boolean
  toggle: Toggle
}

export const Weather: React.FC<Props> = ({
  open,
  toggle,
  weather,
  onChange,
  className
}: Props) => {
  const complete = filter(values(weather), (v) => !v).length == 0
  const windDirectionChange = (e) => {
    const windDirection = e.target.value
    const wind = windDirection == 'No Wind' ? NO_WIND : weather.wind
    onChange({
      ...weather,
      windDirection,
      wind
    })
  }
  const windChange = (e) => {
    const wind = e.target.value
    const windDirection = wind == NO_WIND ? 'No Wind' : weather.windDirection
    onChange({
      ...weather,
      windDirection,
      wind
    })
  }
  return (
    <Section
      title="Weather"
      complete={complete}
      className={className}
      id="weather"
      open={open}
      toggle={toggle}
    >
      <div className="px-3">
        <CloudCoverage
          value={weather.clouds}
          onChange={(e) => onChange({ ...weather, clouds: e.target.value })}
        />
        <WindDirection
          value={weather.windDirection}
          onChange={windDirectionChange}
        />
        <WindSpeed value={weather.wind} onChange={windChange} />
        <SeaState
          value={weather.sea}
          onChange={(e) => onChange({ ...weather, sea: e.target.value })}
        />
        <Tide
          value={weather.tide}
          onChange={(e) => onChange({ ...weather, tide: e.target.value })}
        />
      </div>
    </Section>
  )
}
