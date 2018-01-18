class LoveLiveGroup {
  static _group_list = [];
  static _group_idx = {};

  constructor(name) {
    this.name = name;
    this.list = [];
    this.idx = {};
  }

  getMember(name) {
    return this.idx[name];
  }

  getMembers() {
    return [...this.list];
  }

  addMember(member) {
    if (!(member instanceof LoveLiveMember)) {
      throw new Error("Invalid object given to LoveLiveGroup#addMember(): " + member)
    }
    this.list.push(member);
    this.idx[member.moniker] = member;
  }

  static getGroup(name) {
    return LoveLiveGroup._group_idx[name];
  }

  static getGroups() {
    return [...LoveLiveGroup._group_list];
  }

  static addGroup(group) {
    LoveLiveGroup._group_list.push(group);
    LoveLiveGroup._group_idx[group.name] = group;
  }

  static extractGroup(members) {
    if (members instanceof Array) {
      return members.map(member => {
        const m = LoveLiveMember.getMember(member);
        if (!m) throw new Error("Unknown member: " + member);
        return m;
      })
    } else {
      const m = LoveLiveGroup.getGroup(members).getMembers();
      if (!m) throw new Error("Unknown group: " + members);
      return m;
    }
  }
}

class LoveLiveMember {
  static __member_list = [];
  static __member_idx = {};

  constructor(args) {
    this.args = args;
  }

  get name() { return this.args.name }
  get moniker() { return this.args.moniker }
  get group() { return this.args.group }
  get color() { return this.args.color }
  get emoji() { return this.args.emoji }

  static addMember(member) {
    LoveLiveMember.__member_list.push(member);
    LoveLiveMember.__member_idx[member.moniker] = member;
  }

  static getMember(name) {
    return LoveLiveMember.__member_idx[name];
  }

  static getMembers() {
    return [...LoveLiveMember.__member_list];
  }

  toString() {
    return this.name + "ですわ"
  }
}

const groups = {
  "μ's": [
    { color: "orange", moniker: "honoka", name: "高坂穂乃果", emoji: "	☀" },
    { color: "blue", moniker: "umi", name: "園田海未", emoji: "💘" },
    { color: "gray", moniker: "kotori", name: "南ことり", emoji: "🐤" },
    { color: "red", moniker: "maki", name: "西木野真姫", emoji: "🍅" },
    { color: "#ee0", moniker: "rin", name: "星空凛", emoji: "🌟" },
    { color: "green", moniker: "hanayo", name: "小泉花陽", emoji: "🍚" },
    { color: "purple", moniker: "nozomi", name: "東條希", emoji: "🔯" },
    { color: "magenta", moniker: "niko", name: "矢澤にこ", emoji: "😊" },
    { color: "cyan", moniker: "eri", name: "絢瀬絵里", emoji: "🇷🇺" },
  ],

  "Aqours": [
    { color: "orange", moniker: "chika", name: "高海千歌", emoji: "🍊" },
    { color: "pink", moniker: "riko", name: "桜内梨子", emoji: "🌸" },
    { color: "cyan", moniker: "you", name: "渡辺曜", emoji: "⚓" },
    { color: "gray", moniker: "yoshiko", name: "津島善子", emoji: "😈	" },
    { color: "magenta", moniker: "ruby", name: "黒澤ルビィ", emoji: "🍭" },
    { color: "#ee0", moniker: "hanamaru", name: "国木田花丸", emoji: "💮" },
    { color: "red", moniker: "dia", name: "黒澤ダイヤ", emoji: "💎" },
    { color: "green", moniker: "kanan", name: "松浦果南", emoji: "🐬" },
    { color: "purple", moniker: "mari", name: "小原鞠莉", emoji: "✨" },
  ],

  "SaintSnow": [
    { color: "cyan", moniker: "serah", name: "鹿角聖良", emoji: "❄" },
    { color: "gray", moniker: "leah", name: "鹿角理亞", emoji: "❄" },
  ],
};

for (const kv of Object.entries(groups)) {
  const [group, members] = kv;
  const g = new LoveLiveGroup(group);

  for (const mem of members) {
    const m = new LoveLiveMember({ ...mem, group: group });
    g.addMember(m);
    LoveLiveMember.addMember(m);
  }

  LoveLiveGroup.addGroup(g)
}

export default LoveLiveGroup;