import NesoberiSeries from './NesoSeriesData'
import NesoberiMembers from './NesoMembersData'

export default () => {
  const nesoes = [];
  const group2series = {};
  const group2uniqSeries = {};
  const series2uniqSeries = {};

  for (const s of NesoberiSeries.getSerieses()) {
    const members = NesoberiMembers.extractGroup(s.group);
    const group = members[0].group; // trust first member's group as same group member

    s.groups = { list: [], map: {} };
    s.belongs_to = group;

    // init
    if (!group2series[group]) { group2series[group] = [] }
    if (!group2uniqSeries[group]) { group2uniqSeries[group] = {} }
    if (!group2uniqSeries[group][s.series]) { group2uniqSeries[group][s.series] = {} }
    if (!group2uniqSeries[group][s.series][s.size]) { group2uniqSeries[group][s.series][s.size] = [] }
    if (!series2uniqSeries[s.series]) { series2uniqSeries[s.series] = {} }
    if (!series2uniqSeries[s.series][s.size]) { series2uniqSeries[s.series][s.size] = {} }

    // set
    group2series[group].push(s);
    group2uniqSeries[group][s.series][s.size].push(s);

    for (const m of members) {
      const item = {
        series: s,
        member: m,
        image: "http://acceptessa-checklist.s3-website-ap-northeast-1.amazonaws.com/" +
        `neso/${s.moniker}/${m.moniker}.jpg`,
      };

      nesoes.push(item);
      s.groups.list.push(m);
      s.groups.map[m.moniker] = m;
      series2uniqSeries[s.series][s.size][m.moniker] = item;
    }
  }

  return {
    groups: NesoberiMembers,
    series: NesoberiSeries,

    group2series,
    group2uniqSeries,
    series2uniqSeries,
    nesoes,
  }
};