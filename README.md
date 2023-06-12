

## Description
[NEST](https://docs.nestjs.cn/) 官网
[Literature Review](http://www.manongjc.com/detail/61-khbkpkjciadwyak.html) 学习文献一
[Literature Review](https://blog.csdn.net/lxy869718069/article/details/114028195) 学习文献二
[Nest-Pipes](https://juejin.cn/post/6844904052308836365) pipe
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```


## TypeORM连接数据库

```bash
# typeorm mysql2
$ yarn add @nestjs/typeorm typeorm mysql2 -S

# Swagger
$ yarn add @nestjs/swagger swagger-ui-express -S

# class-transformer、class-validator、rxjs、xml2js
$ yarn add rxjs xml2js class-validator class-transformer
```

## 常用的命令方法

```bash
# nest g [文件类型] [文件名] [文件目录]
$ 其中文件类型如：[mo：Module]、[co：controller]、[s:service]
需要注意的是创建顺序：先创建Module, 再创建Controller和Service, 这样创建出来的文件在Module中自动注册。
反之，后创建Module, Controller和Service,会被注册到外层的app.module.ts

# 常用命令
> 创建一个过滤器
$ nest g filter core/filter/http-exception
> 创建一个拦截器
$ nest g interceptor core/interceptor/transform
```

## TypeORM创建实体以及API
**主列部分：**
```bash
# @PrimaryColumn()
创建一个主列，它可以获取任何类型的任何值。你也可以指定列类型。 如果未指定列类型，则将从属性类型自动推断
import { Entity, PrimaryColumn } from "typeorm";

	@Entity()
	export class User {
		@PrimaryColumn()
		id: number;
	}

# @PrimaryGeneratedColumn()
创建一个主列，该值将使用自动增量值自动生成。 它将使用auto-increment /serial /sequence创建int列（取决于数据库）
import { Entity, PrimaryGeneratedColumn } from "typeorm";

	@Entity()
	export class User {
		@PrimaryGeneratedColumn()			//auto-increment /serial /sequence
		@PrimaryGeneratedColumn("uuid")			//uuid自动生成
		id: number;
	}

# 特殊列
# @CreateDateColumn
是一个特殊列，自动为实体插入日期。无需设置此列，该值将自动设置。

# @UpdateDateColumn
是一个特殊列，在每次调用实体管理器或存储库的save时，自动更新实体日期。无需设置此列，该值将自动设置。

# @VersionColumn
是一个特殊列，在每次调用实体管理器或存储库的save时自动增长实体版本（增量编号）。无需设置此列，该值将自动设置。


# 更多类型列
传送门：https://typeorm.biunav.com/zh/entities.html#主列

```

**列选项部分：**
```bash
# @Column({Columnoptions})
列选项定义实体列的其他选项。 你可以在@ Column上指定列选项：
import { Column, Entity, } from "typeorm";

	@Column({
		type: "varchar",
		length: 150,
		unique: true,
		// ...
	})
	name: string;

Columnoptions中可用选项列表：
type: ColumnType - 列类型。其中之一在上面.
name: string - 数据库表中的列名。
**默认情况下，列名称是从属性的名称生成的。 你也可以通过指定自己的名称来更改它。**
1. length: number - 列类型的长度。 例如，如果要创建varchar（150）类型，请指定列类型和长度选项。
2. width: number - 列类型的显示范围。 仅用于MySQL integer types(opens new window)
3. onUpdate: string - ON UPDATE触发器。 仅用于 MySQL (opens new window).
4. nullable: boolean - 在数据库中使列NULL或NOT NULL。 默认情况下，列是nullable：false。
5. update: boolean - 指示"save"操作是否更新列值。如果为false，则只能在第一次插入对象时编写该值。 默认值为"true"。
6. select: boolean - 定义在进行查询时是否默认隐藏此列。 设置为false时，列数据不会显示标准查询。 默认情况下，列是select：true
7. default: string - 添加数据库级列的DEFAULT值。
8. primary: boolean - 将列标记为主要列。 使用方式和@ PrimaryColumn相同。
9. unique: boolean - 将列标记为唯一列（创建唯一约束）。

# 更多类型列
传送门：https://typeorm.biunav.com/zh/entities.html#列选项
```
## 树实体

```
树实体最重要的一个作用无非就是获取如下所述的一种列表数据所存储的一种表结构。
实际上，这种可以看情况使用，可以选择使用树实体。也可以选择使用单表，然后用一个字段保存其父子关系

# 传送门：https://typeorm.biunav.com/zh/tree-entities.html
```

## 视图实体

```
这个内容用的比较少，可以看需要了解。
# 传送门：https://typeorm.biunav.com/zh/view-entities.html
```


## Find 选项
**基础选项**
> 基础选项指的是所有存储库和管理器find方法都接受可用于查询所需数据的特殊选项，而无需使用QueryBuilder

- **select **- 表示必须选择对象的哪些属性

```bash
userRepository.find({ select: ["firstName", "lastName"] });
```

- **relations** - 关系需要加载主体。 也可以加载子关系（join 和 leftJoinAndSelect 的简写）

```bash
userRepository.find({ relations: ["profile", "photos", "videos"] });
userRepository.find({ relations: ["profile", "photos", "videos", "videos.video_attributes"] });
```

- **join** - 需要为实体执行联接，扩展版对的"relations"

```bash
userRepository.find({
    join: {
        alias: "user",
        leftJoinAndSelect: {
            profile: "user.profile",
            photo: "user.photos",
            video: "user.videos"
        }
    }
});
```

- **where** - 查询实体的简单条件

```bash
userRepository.find({ where: { firstName: "Timber", lastName: "Saw" } });
# 查询嵌入实体列应该根据定义它的层次结构来完成。 例：
userRepository.find({ where: { name: { first: "Timber", last: "Saw" } } });
#使用 OR 运算符查询：
userRepository.find({
    where: [{ firstName: "Timber", lastName: "Saw" }, { firstName: "Stan", lastName: "Lee" }]
});
#将执行以下查询：
SELECT * FROM "user" WHERE ("firstName" = 'Timber' AND "lastName" = 'Saw') OR ("firstName" = 'Stan' AND "lastName" = 'Lee')

```

- **order** - 选择排序

```bash
userRepository.find({
    order: {
        name: "ASC",
        id: "DESC"
    }
});
```
**返回多个实体的find方法（find，findAndCount，findByIds），同时也接受以下选项：**
- **skip **- 偏移（分页）

```bash
userRepository.find({
    skip: 5
});
```

- **take **- limit (分页) - 得到的最大实体数

```bash
userRepository.find({
    take: 10
});
```
**如果你正在使用带有 MSSQL 的 typeorm，并且想要使用take或limit，你必须正确使用 order，否则将会收到以下错误：'FETCH语句中NEXT选项的使用无效。'**
```bash
userRepository.find({
    order: {
        columnName: "ASC"
    },
    skip: 0,
    take: 10
});
```

- **cache **- 启用或禁用查询结果缓存。 有关更多信息和选项，请参见[caching](https://typeorm.biunav.com/zh/caching.html)

```bash
userRepository.find({
    cache: true
});
```

- **lock **- 启用锁查询。 只能在findOne方法中使用。 lock是一个对象，可以定义为

```bash
{ mode: "optimistic", version: number|Date }
```

**或者**

```bash
{ mode: "pessimistic_read"|"pessimistic_write"|"dirty_read" }
```

**例如:**

```bash
userRepository.findOne(1, {
    lock: { mode: "optimistic", version: 1 }
})
```

**find 选项的完整示例：**
```bash
userRepository.find({
    select: ["firstName", "lastName"],
    relations: ["profile", "photos", "videos"],
    where: {
        firstName: "Timber",
        lastName: "Saw"
    },
    order: {
        name: "ASC",
        id: "DESC"
    },
    skip: 5,
    take: 10,
    cache: true
});
```

**进阶选项**
> TypeORM 提供了许多内置运算符，可用于创建更复杂的查询

- **Not **

```bash
import { Not } from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    title: Not("About #1")
});
```

**将执行以下查询：**

```bash
SELECT * FROM "post" WHERE "title" != 'About #1'
```

- **LessThan **

```bash
import { LessThan } from "typeorm";

const loadedPosts = await connection.getRepository(Post).find({
    likes: LessThan(10)
});
```

**将执行以下查询：**

```bash
SELECT * FROM "post" WHERE "likes" < 10
```

- **LessThanOrEqual **

```bash
import { LessThanOrEqual } from "typeorm";
const loadedPosts = await connection.getRepository(Post).find({
    likes: LessThanOrEqual(10)
});
```

**将执行以下查询：**

```bash
SELECT * FROM "post" WHERE "likes" <= 10
```

**更多进阶选项**
传送门：https://typeorm.biunav.com/zh/find-options.html#进阶选项