import { ChevronRight } from 'components/Icon'
import { Location, Station } from 'models'
import Link from 'next/link'
import { Button, ListGroup } from 'reactstrap'

interface StationProps {
  station: Station
}

const StationLocation = ({ latitude, longitude }: Location) => (
  <small className="text-black-50">
    {`${
      latitude && longitude
        ? '(' + latitude + ',' + longitude + ')'
        : 'No Location'
    }`}
  </small>
)

const StationItem: React.FC<StationProps> = ({ station }: StationProps) => {
  return (
    <li className="list-group-item">
      <Link
        href={{
          pathname: '/trips/stations',
          query: { id: station.id }
        }}
        as={`/trips/stations?id=${station.id}`}
      >
        <a className="text-dark d-flex justify-content-between align-items-center">
          <div>
            <div>Station {station.stationId}</div>
            <StationLocation {...station.location} />
          </div>
          <ChevronRight />
        </a>
      </Link>
    </li>
  )
}

interface StationsProps {
  stations: Station[]
  onClick: (e: React.MouseEvent) => any
}

export const Stations: React.FC<StationsProps> = ({
  stations,
  onClick
}: StationsProps) => {
  if (!stations || stations.length == 0) {
    return <BlankSlate onClick={onClick} />
  }
  return (
    <>
      <ListGroup flush>
        {stations.map((s, key) => (
          <StationItem station={s} key={key} />
        ))}
      </ListGroup>
    </>
  )
}

interface BlankSlateProps {
  onClick: (e: React.MouseEvent) => any
}

const BlankSlate: React.FC<BlankSlateProps> = ({
  onClick
}: BlankSlateProps) => (
  <div className="bg-light p-5 text-center">
    <div style={{ fontSize: '1.25rem' }}>No Stations</div>
    <Button onClick={onClick} color="link" aria-label="Add Station">
      Add Station
    </Button>
  </div>
)
