import {
  ClientProviderOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from './user';

const protoPath = join(
  process.cwd(),
  `/dist/libs/microservices/use-service/user.proto`,
);

// const URL = 'localhost:50051';

export const options: MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: USER_PACKAGE_NAME,
    // url: URL,
    protoPath: protoPath,
  },
};

export const registerOption: ClientProviderOptions = {
  name: USER_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    package: USER_PACKAGE_NAME,
    // url: URL,
    protoPath: protoPath,
  },
};
