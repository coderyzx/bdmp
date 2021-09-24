const locationData = 'this.props.history.location.query';

const browserDashboard = {
  browserName: `${locationData}.browserName`,
};

const osDashboard = {
  osName: `${locationData}.osName`,
};

const pvDashboard = {
  // page: `${locationData}.page`,
};

const rankDashboard = {
  rank: `${locationData}.rank`,
};

const browserUserListDashboard = {
  browserVersion: `${locationData}.browserVersion`,
  ...browserDashboard,
};

const retentionUserListDashboard = {
  firstTime: `${locationData}.firstTime`,
  retentionTime: `${locationData}.retentionTime`,
};

const osUserListDashboard = {
  osVersion: `${locationData}.osVersion`,
  ...osDashboard,
};

const userPath = {
  startUrl: 'this.params.startUrl',
}

const formMapping = {
  browserDashboard,
  osDashboard,
  pvDashboard,
  rankDashboard,
  browserUserListDashboard,
  osUserListDashboard,
  retentionUserListDashboard,
  userPath,
};

export default formMapping;
