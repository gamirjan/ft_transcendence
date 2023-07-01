import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChannelAdmin } from "../ChannelAdmins/ChannelAdmin.entity";
import { Channelmessage } from "../ChannelMessages/ChannelMessage.entity";
import { User } from "../Users/user.entity";
import { ChannelUser} from "../ChannelUsers/ChannelUser.entity";

@Index("channels_channelname_key", ["channelname"], { unique: true })
@Index("channels_pkey", ["id"], { unique: true })
@Entity("channels", { schema: "public" })
export class Channel {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("enum", {
    name: "channeltype",
    nullable: true,
    enum: ["1", "2", "3"],
  })
  channeltype: "1" | "2" | "3" | null;

  @Column("character varying", {
    name: "channelname",
    nullable: true,
    unique: true,
    length: 50,
  })
  channelname: string | null;

  @OneToMany(() => ChannelAdmin, (channeladmins) => channeladmins.channel)
  channeladmins: ChannelAdmin[];

  @OneToMany(
    () => Channelmessage,
    (channelmessages) => channelmessages.channel
  )
  channelmessages: Channelmessage[];

  @ManyToOne(() => User, (users) => users.channels)
  @JoinColumn([{ name: "ownerid", referencedColumnName: "id" }])
  owner: User;

  @OneToMany(() => ChannelUser, (channelusers) => channelusers.channel)
  channelusers: ChannelUser[];

  // @OneToMany(() => Mutelist, (mutelist) => mutelist.channel)
  // mutelists: Mutelist[];
}
