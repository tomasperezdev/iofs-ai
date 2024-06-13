export interface Fixture {
    fixture:    FixtureClass;
    league:     League;
    teams:      Goals;
    goals:      Goals;
    score:      Score;
    events:     any[];
    lineups:    any[];
    statistics: any[];
    players:    any[];
}

export interface FixtureClass {
    id:        number;
    referee:   null;
    timezone:  string;
    date:      string;
    timestamp: number;
    periods:   Periods;
    venue:     Venue;
    status:    Status;
}

export interface Periods {
    first:  null;
    second: null;
}

export interface Status {
    long:    string;
    short:   string;
    elapsed: null;
}

export interface Venue {
    id:   number;
    name: string;
    city: string;
}

export interface Goals {
    home: Away | null;
    away: Away | null;
}

export interface Away {
    id:     number;
    name:   string;
    logo:   string;
    winner: null;
}

export interface League {
    id:      number;
    name:    string;
    country: string;
    logo:    string;
    flag:    null;
    season:  number;
    round:   string;
}

export interface Score {
    halftime:  Goals;
    fulltime:  Goals;
    extratime: Goals;
    penalty:   Goals;
}
