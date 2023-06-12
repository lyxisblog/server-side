import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Node")
export class Node {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column("int")
  title: number;

  @Column({ length: 20, default: '' })
  author: string;

  @Column("text")
  content: string;

  @Column({ default: '' })
  thumb_url: string;

  @Column('tinyint')
  type: number

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  create_time: Date

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  update_time: Date
}