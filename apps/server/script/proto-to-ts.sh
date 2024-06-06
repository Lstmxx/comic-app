#!/bin/bash

# 遍历 libs/microservices 目录下的所有 .proto 文件
for protoFile in $(find ./libs/microservices -name '*.proto'); do
  # 获取不带扩展名的文件名
  baseName=$(basename "$protoFile" .proto)

  echo $baseName
  
  # 获取文件所在的目录
  dirName=$(dirname "$protoFile")

  echo $dirName
  
  outFilejs="$dirName/$baseName.js"

  echo $outFilejs

  echo $protoFile

  # 生成输出文件名
  outFile="./$baseName.interface.ts"

  protoc --plugin=./node_modules/ts-proto/protoc-gen-ts_proto --ts_proto_opt=nestJs=true --ts_proto_out=./ ${protoFile}

  # 运行 npx 命令来生成 TypeScript 类型定义
  # npx proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir="$dirName" ""
done