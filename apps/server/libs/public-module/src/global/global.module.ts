import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module, DynamicModule, ValidationPipe } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { MulterModule } from '@nestjs/platform-express';
// import { TypeOrmModule } from '@nestjs/typeorm';

import {
  rootPath,
  AllExceptionFilter,
  TransformInterceptor,
} from '@app/public-tool';
import { LoggerModule } from '../logger';
// import { UploadModule } from '../upload';
// import { AliSmsModule } from '../aliSms';
// import { AliOssModule } from '../aliOss';

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

// import redisStore from 'cache-manager-redis-store';
// import { diskStorage } from 'multer';
import { load } from 'js-yaml';
import { merge, cloneDeepWith } from 'lodash';
// import moment from 'moment';
// import nuid from 'nuid';

export interface GlobalModuleOptions {
  yamlFilePath?: string[]; // 配置文件路径
  microservice?: string[]; // 开启微服务模块
  typeorm?: boolean; // 开启 orm 模块
  upload?: boolean; // 开启文件上传模块
  cache?: boolean; // 开启缓存模块
  aliSms?: boolean; // 开启阿里云短信模块
  aliOss?: boolean; // 开启阿里云OSS对象存储
}

/**
 * 全局模块
 */
@Module({})
export class GlobalModule {
  /**
   * 全局模块初始化
   */
  static forRoot(options: GlobalModuleOptions): DynamicModule {
    const {
      yamlFilePath = [],
      microservice,
      typeorm,
      // upload,
      // cache,
      // aliSms,
      // aliOss,
    } = options || {};

    const imports: DynamicModule['imports'] = [
      // 配置模块
      ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
        load: [
          () => {
            let configs: any = {};
            const configPath = [
              'config.yaml',
              'config.microservice.yaml',
              'config.jwt.yaml',
              // `${process.env.NODE_ENV || 'development'}.yaml`,
              ...yamlFilePath,
            ];
            for (const path of configPath) {
              try {
                // 读取并解析配置文件
                const filePath = join(rootPath, 'config', path);
                if (existsSync(filePath))
                  configs = merge(
                    configs,
                    load(readFileSync(filePath, 'utf8')),
                  );
              } catch {}
            }
            // 递归将 null 转 空字符串
            configs = cloneDeepWith(configs, (value) => {
              if (value === null) return '';
            });

            console.log(configs);

            return configs;
          },
        ],
      }),
      // 日志模块
      LoggerModule.forRoot({
        isGlobal: true,
        useFactory: (configService: ConfigService) => {
          const path = configService.get('logsPath');
          console.log('logger');
          return { filename: join(rootPath, `logs/${path}/${path}.log`) };
        },
        inject: [ConfigService],
      }),
    ];

    // 开启微服务模块
    if (microservice) {
      imports.push({
        ...ClientsModule.registerAsync(
          microservice.map((name) => ({
            name,
            useFactory: (configService: ConfigService) => {
              const microserviceClient = configService.get(
                `microserviceClients.${name}`,
              );
              return microserviceClient;
            },
            inject: [ConfigService],
          })),
        ),
        global: true,
      });
    }

    // 启动 orm 模块
    if (typeorm) {
      // imports.push(
      //   TypeOrmModule.forRootAsync({
      //     useFactory: (configService: ConfigService) => {
      //       const db = configService.get('db');
      //       return { ...db, autoLoadEntities: true };
      //     },
      //     inject: [ConfigService],
      //   }),
      // );
    }

    // // 开启文件上传
    // if (upload) {
    //   imports.push(
    //     {
    //       ...MulterModule.registerAsync({
    //         imports: [ConfigModule],
    //         useFactory: (configService: ConfigService) => {
    //           let path = configService.get('uploadPath');
    //           path = join(rootPath, path);
    //           existsSync(path) || mkdirSync(path);
    //           return {
    //             // 文件储存
    //             storage: diskStorage({
    //               destination: function (_req, _file, cb) {
    //                 const day = moment().format('YYYY-MM-DD');
    //                 const folder = `${path}/${day}`;
    //                 existsSync(folder) || mkdirSync(folder);
    //                 cb(null, folder);
    //               },
    //               filename: (_req, { originalname }, cb) => {
    //                 return cb(null, nuid.next() + extname(originalname));
    //               },
    //             }),
    //           };
    //         },
    //         inject: [ConfigService],
    //       }),
    //       global: true,
    //     },
    //     ServeStaticModule.forRootAsync({
    //       useFactory: (configService: ConfigService) => {
    //         const path = configService.get('uploadPath');
    //         return [
    //           { rootPath: join(rootPath, path), exclude: ['/api/:path*'] },
    //         ];
    //       },
    //       inject: [ConfigService],
    //     }),
    //     UploadModule.forRoot({
    //       isGlobal: true,
    //       useFactory: (configService: ConfigService) => {
    //         const fileLimit = configService.get('fileLimit');
    //         return { fileLimit };
    //       },
    //       inject: [ConfigService],
    //     }),
    //   );
    // }

    // 开启缓存模块
    // if (cache) {
    //   imports.push({
    //     ...CacheModule.registerAsync({
    //       useFactory: (configService: ConfigService) => {
    //         const { redis } = configService.get('cache');
    //         // 使用 redis 做缓存服务
    //         return redis?.host ? { store: redisStore, ...redis } : {};
    //       },
    //       inject: [ConfigService],
    //     }),
    //     global: true,
    //   });
    // }

    // 开启阿里云OSS对象存储
    // if (aliOss) {
    //   imports.push(
    //     AliOssModule.forRoot({
    //       isGlobal: true,
    //       useFactory: (configService: ConfigService) => {
    //         const uploadPath = configService.get('uploadPath');
    //         const fileLimit = configService.get('fileLimit');
    //         const ali = configService.get('ali');
    //         const oss = configService.get('oss');
    //         return { uploadPath, fileLimit, ...ali, ...oss };
    //       },
    //       inject: [ConfigService],
    //     }),
    //   );
    // }

    // 开启阿里云短信模块
    // if (aliSms) {
    //   imports.push(
    //     AliSmsModule.forRoot({
    //       isGlobal: true,
    //       useFactory: (configService: ConfigService) => {
    //         const { accessKeyId, accessKeySecret } = configService.get('ali');
    //         return { accessKeyId, accessKeySecret };
    //       },
    //       inject: [ConfigService],
    //     }),
    //   );
    // }

    console.log('GlobalModule', imports);

    return {
      module: GlobalModule,
      imports,
      providers: [
        // 全局使用验证管道，并统一报错处理
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe({ transform: true }),
        },
        // 异常过滤器
        // { provide: APP_FILTER, useClass: AllExceptionFilter },
        // 响应参数转化拦截器
        // { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
      ],
    };
  }
}
