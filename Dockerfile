FROM nginx:latest
RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

WORKDIR /app/ka-ui
ADD ./site/site /app/ka-ui
COPY ./nginx.conf /etc/nginx/nginx.conf

# 运行的环境变量设置
ENV RUN_MODE pro
EXPOSE 80
