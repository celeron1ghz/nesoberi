class NesoberiSeries {
  static __series_list = [];
  static __series_idx = {};
  static __sizes = new Set();
  static __serieses = new Set();
  static __sort_order = {
    "プチ": 1,
    "SS":  2,
    "S":   3,
    "M":   4,
    "L":   5,
    "LL":  6,
    "テラ": 7,
  };

  constructor(args) {
    this.args = args;
  }

  get series() { return this.args.series }
  get moniker() { return this.args.moniker }
  get size() { return this.args.size }
  get group() { return this.args.group }
  get sold_at() { return this.args.sold_at || '9999-99-99' }
  get price() { return this.args.price }

  get price_commify() {
    return this.price
      ? this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : null
  }

  static addSeries(series) {
    NesoberiSeries.__series_list.push(series);
    NesoberiSeries.__series_idx[series.series] = series;
    NesoberiSeries.__sizes.add(series.size);
    NesoberiSeries.__serieses.add(series.series);
  }

  static getSeries(name) {
    return NesoberiSeries.__series_idx[name];
  }

  static getSerieses() {
    return [...NesoberiSeries.__series_list];
  }

  static getUniqueSizes() {
    return Array.from(NesoberiSeries.__sizes.values())
      .sort((a,b) => 
        NesoberiSeries.__sort_order[a] < NesoberiSeries.__sort_order[b]
          ? -1
          : NesoberiSeries.__sort_order[a] > NesoberiSeries.__sort_order[b]
            ? 1
            : 0
      );
  }

  static getUniqueSerieses() {
    return Array.from(NesoberiSeries.__serieses.values());
  }

  toString() {
    return this.series + "ですわ"
  }
}

const MUSE_GRADE1 = ["maki", "rin", "hanayo"];
const MUSE_GRADE2 = ["honoka", "umi", "kotori"];
const MUSE_GRADE3 = ["nozomi", "niko", "eri"];

const AQOURS_GRADE1 = ["yoshiko", "hanamaru", "ruby"];
const AQOURS_GRADE2 = ["chika", "you", "riko"];
const AQOURS_GRADE3 = ["dia", "kanan", "mari"];

const series = [
  ...[
    { sold_at: "2015-01-20", group: MUSE_GRADE2 },
    { sold_at: "2015-02-10", group: MUSE_GRADE1 },
    { sold_at: "2015-03-31", group: MUSE_GRADE3 },
  ].map(s => { return { ...s, series: "音ノ木坂制服", moniker: "otonoki", size: "S" } }),

  ...[
    { sold_at: "2015-04-30", group: ["honoka"] },
    { sold_at: "2015-05-31", group: ["eri"] },
    { sold_at: "2015-06-10", group: ["nozomi"] },
    { sold_at: "2015-07-10", group: ["umi"] },
    { sold_at: "2015-07-31", group: ["niko"] },
    { sold_at: "2015-08-10", group: ["maki"] },
    { sold_at: "2015-09-10", group: ["kotori"] },
    { sold_at: "2015-09-20", group: ["hanayo"] },
    { sold_at: "2015-10-31", group: ["rin"] },
  ].map(s => { return { ...s, series: "音ノ木坂制服（ハイパージャンボ）", moniker: "otonoki", size: "L" } }),

  ...[
    { sold_at: "2016-01-31", group: MUSE_GRADE2 },
    { sold_at: "2016-03-31", group: MUSE_GRADE1 },
    { sold_at: "2016-02-29", group: MUSE_GRADE3 },
  ].map(s => { return { ...s, series: "音ノ木坂制服（メガジャンボ）", moniker: "otonoki", size: "L" } }),

  ...[
    { sold_at: "2015-10-31", group: MUSE_GRADE1 },
    { sold_at: "2015-11-20", group: MUSE_GRADE3 },
    { sold_at: "2015-12-20", group: MUSE_GRADE2 },
  ].map(s => { return { ...s, series: "Happy Maker!", moniker: "hapimeka", size: "SS" } }),

  ...[
    { sold_at: "2016-01-31", group: MUSE_GRADE2 },
    { sold_at: "2016-02-29", group: MUSE_GRADE1 },
    { sold_at: "2016-03-20", group: MUSE_GRADE3 },
  ].map(s => { return { ...s, series: "僕たちはひとつの光", moniker: "bokuhika", size: "SS" } }),

  { series: "音ノ木坂制服", moniker: "otonoki", size: "プチ", sold_at: "2015-05-20", group: [...MUSE_GRADE2, "rin", "hanayo"] },
  { series: "音ノ木坂制服", moniker: "otonoki", size: "プチ", sold_at: "2015-06-30", group: ["honoka", "maki", ...MUSE_GRADE3] },
  { series: "音ノ木坂制服", moniker: "otonoki", size: "プチ", sold_at: "2015-12-27", group: "μ's" },

  { series: "雪ミク", moniker: "miku", size: "S", sold_at: "2016-06-29", price: 2700, group: "μ's" },

  { series: "セガスタッフイメージガール（μ's）", moniker: "segarin", size: "L", sold_at: "2016-03-31", group: ["rin"] },
  { series: "セガ名作タイトル×星空凛", moniker: "puyorin", size: "L", sold_at: "2016-03-31", group: ["rin"] },
  { series: "ローソン", moniker: "puyorin", size: "L", sold_at: "2015-09-15", group: ["umi"] },
  { series: "スクフェス感謝祭2016", moniker: "yodare", size: "M", sold_at: "2016-05-21", group: ["honoka"] },

  { series: "SUNNY DAY SONG", moniker: "sds", size: "LL", sold_at: "2015-12-27", price: 4320, group: "μ's" },
  { series: "おとぎ話編覚醒前衣装", moniker: "otogi", size: "L", sold_at: "2016-09-25", price: 3780, group: "μ's" },

  ///////////////////////////////////
  ////////// ここからAqours //////////
  ///////////////////////////////////
  ...[
    { sold_at: "2018-01-44", group: AQOURS_GRADE2 },
    //{ sold_at: "", group: AQOURS_GRADE1 },
    //{ sold_at: "", group: AQOURS_GRADE3 },
  ].map(s => { return { ...s, series: "浦ノ星制服（夏服）", moniker: "uranohoshi_summer1", size: "SS" } }),

  ...[
    { sold_at: "2016-08-20", group: AQOURS_GRADE2 },
    { sold_at: "2016-08-31", group: AQOURS_GRADE1 },
    { sold_at: "2016-09-20", group: AQOURS_GRADE3 },
  ].map(s => { return { ...s, series: "浦ノ星制服（夏服）", moniker: "uranohoshi_summer1", size: "S" } }),

  ...[
    { sold_at: "2016-10-10", group: ["chika"] },
    { sold_at: "2016-11-10", group: ["riko"] },
    { sold_at: "2016-12-10", group: ["you"] },
    { sold_at: "2017-01-31", group: ["yoshiko"] },
    { sold_at: "2017-02-28", group: ["ruby"] },
    { sold_at: "2017-03-20", group: ["hanamaru"] },
    { sold_at: "2017-04-30", group: ["dia"] },
    { sold_at: "2017-05-31", group: ["kanan"] },
    { sold_at: "2017-06-30", group: ["mari"] },
  ].map(s => { return { ...s, series: "浦ノ星制服（夏服）", moniker: "uranohoshi_summer2", size: "L" } }),

  ...[
    { sold_at: "2017-01-10", group: AQOURS_GRADE2 },
    { sold_at: "2017-02-10", group: AQOURS_GRADE1 },
    { sold_at: "2017-03-10", group: AQOURS_GRADE3 },
  ].map(s => { return { ...s, series: "浦ノ星制服（冬服）", moniker: "uranohoshi_summer3", size: "SS" } }),

  ...[
    { sold_at: "2017-10-20", group: AQOURS_GRADE2 },
    { sold_at: "2017-11-20", group: AQOURS_GRADE1 },
    { sold_at: "2017-12-20", group: AQOURS_GRADE3 },
  ].map(s => { return { ...s, series: "浦ノ星制服（冬服）", moniker: "uranohoshi_summer5", size: "L" } }),

  { series: "浦ノ星制服（夏服）", moniker: "uranohoshi_summer", size: "プチ", sold_at: "2017-01-31", group: ["hanamaru", "yoshiko", ...AQOURS_GRADE2] },
  { series: "浦ノ星制服（夏服）", moniker: "uranohoshi_summer", size: "プチ", sold_at: "2017-02-20", group: ["chika", "ruby", ...AQOURS_GRADE3] },

  ...[
    { sold_at: "2017-07-31", group: ["chika"] },
    { sold_at: "2017-08-31", group: ["riko"] },
    { sold_at: "2017-09-30", group: ["you"] },
  ].map(s => { return { ...s, series: "ダイスキだったらダイジョウブ", moniker: "daidai", size: "L" } }),

  ...[
    { sold_at: "2017-04-10", group: AQOURS_GRADE2 },
    { sold_at: "2017-05-20", group: AQOURS_GRADE1 },
  ].map(s => { return { ...s, series: "夢で夜空を照らしたい", moniker: "yumesora", size: "S" } }),

  { series: "初代Aqours", moniker: "1st_aqours", size: "S", sold_at: "2017-06-20", group: AQOURS_GRADE3 },

  ...[
    { sold_at: "2017-07-31", group: AQOURS_GRADE1 },
    { sold_at: "2017-08-20", group: AQOURS_GRADE2 },
    { sold_at: "2017-09-20", group: AQOURS_GRADE3 },
  ].map(s => { return { ...s, series: "想いよひとつになれ", moniker: "omohito", size: "S" } }),

  ...[
    { sold_at: "2017-06-25", group: AQOURS_GRADE2 },
    { sold_at: "2017-07-28", group: AQOURS_GRADE1 },
    { sold_at: "2017-08-30", group: AQOURS_GRADE3 },
  ].map(s => { return { ...s, series: "未熟DREAMER", moniker: "midori", size: "S", price: 2700 } }),

  { series: "初期SR（スマイル）", moniker: "sr", size: "S", sold_at: "2017-10-31", group: ["chika", "hanamaru", "mari"] },
  { series: "初期SR（ピュア）", moniker: "sr", size: "S", sold_at: "2017-11-20", group: ["kanan", "ruby", "you"] },
  { series: "初期SR（クール）", moniker: "sr", size: "S", sold_at: "2017-12-31", group: ["yoshiko", "riko", "dia"] },

  { series: "サンタガール編（覚醒）", moniker: "santa", size: "LL", sold_at: "2017-11-24", price: 4860, group: "Aqours" },

  { series: "セガスタッフイメージガール（Aqours）", moniker: "segarin", size: "L", sold_at: "9999-99-99", group: ["hanamaru"] },

  ...[
    { sold_at: "2018-01-44", group: ["chika"] },
  ].map(s => { return { ...s, series: "練習着", moniker: "rensyuu", size: "L" } }),

  { series: "CYaRon", moniker: "cyaron", size: "M", sold_at: "2018-02-28", price: 3780, group: ["chika", "you", "ruby"] },
  { series: "AZALEA", moniker: "azalea", size: "M", sold_at: "2018-03-31", price: 3780, group: ["dia", "kanan", "hanamaru"] },
  { series: "GuiltyKiss", moniker: "gk", size: "M", sold_at: "2018-03-31", price: 3780, group: ["yoshiko", "riko", "mari"], },

  { series: "SELF CONTROL!!", moniker: "1st_aqours", size: "M", sold_at: "2018-04-27", price: 3800, group: "SaintSnow" },

  ...[
    { sold_at: "2018-03-31", group: ["chika"] },
    { sold_at: "2018-05-31", group: ["riko"] },
    { sold_at: "2018-06-30", group: ["kanan"] },
  ].map(s => { return { ...s, series: "浦ノ星制服（冬服）", moniker: "uranohoshi_summer_", size: "テラ", price: 21384 } }),

  { series: "想いよひとつになれ", moniker: "uranohoshi_summer", size: "プチ", sold_at: "2017-01-20", group: ["dia", "ruby", ...AQOURS_GRADE2] },
]

for (const se of series) {
  const s = new NesoberiSeries(se);
  NesoberiSeries.addSeries(s);
}

export default NesoberiSeries;