# Server

使用nestjs搭建的后台微服务

## 技术栈

- 框架：nestjs
- 微服务通信：grpc
- 数据库：Mysql、redis

## 使用

使用前先build 一下libs下的microservices包

```sh
nest build microservices
```

使用nest命令指定服务启动即可

```sh
nest start xxx --watch #xxx为服务名
```

## 服务清单

server: 网关服务(现在耦合了漫画相关的逻辑，以后会抽离为微服务)

user-service: 用户相关微服务

## 开发流程

### 微服务

从新增一个微服务开始

#### 创建微服务

```sh
nest g app xxx-service
```

在libs/microservices增加对应名字的文件夹，并按照例子增加相应文件

```tree
 xxx-service
    ├── index.ts // 统一出口
    ├── options.ts // 服务配置
    └── xxx.proto // grpc proto文件
```

增加完proto文件后使用**scripts/proto-to-ts.sh**脚本生成对应的ts文件

```sh
sh scripts/proto-to-ts.sh
```

此时xxx-service目录下多了一个与proto文件同名的ts文件

```tree
xxx-service
    ├── index.ts
    ├── options.ts
    ├── xxx.proto
 +  └── xxx.ts
```

#### 配置options

在options文件中增加**options**和**registerOption**

- options: 用于微服务配置
- registerOption: 用于网关服务注册

内容详情可以参考use-service

编写完options文件后在 **libs/microservices/index.ts** 中引入

```ts
export const serviceList = [userServiceOption, +yourServiceOption];
```

### 网关服务注册

在**apps/server/src/app.module.ts**中加入

```ts
GlobalModule.forRoot({
  yamlFilePath: ['apps/server.yaml'],
  microservice: [USER_PACKAGE_NAME, YOUR_PACKAGE_NAME],
  serverName: 'server',
  cache: true,
  typeorm: true,
  // upload: true,
  // aliOss: true,
}),
```

搞定完后就是愉快地开发了～
