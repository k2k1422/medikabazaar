FROM python:3.7.4-alpine3.10

ADD ./requirement.txt /app/requirement.txt

RUN set -ex \
    && apk add --no-cache --virtual .build-deps gcc python3-dev musl-dev gpgme-dev libc-dev build-base linux-headers zeromq-dev unixodbc-dev unixodbc \
    && apk add --no-cache mariadb-dev \
    && python -m venv /env \
    && /env/bin/pip install --upgrade pip \
    && /env/bin/pip install --no-cache-dir -r /app/requirement.txt \
    && runDeps="$(scanelf --needed --nobanner --recursive /env \
    | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
    | sort -u \
    | xargs -r apk info --installed \
    | sort -u)" \
    && apk add --virtual rundeps $runDeps

ADD . /app
WORKDIR /app

ENV VIRTUAL_ENV /env
ENV PATH /env/bin:$PATH

EXPOSE 8080
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8080", "--workers", "3", "--timeout=90", "--graceful-timeout=10"]