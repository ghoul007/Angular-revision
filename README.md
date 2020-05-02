# Tuto

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.0.

## Deploy firbase-cli
 
 ```
npm i -g firebase-tools
firebase login
firebase init
firebase deploy
```

## Angular universal

```
ng add @nguniversal/express-engine  --clientProject tuto
npm i @nguniversal/module-map-ngfactory-loader (for lazyloader)
npm  run build:ssr
npm  run serve:ssr
```

## use nestjs
```
ng add @nestjs/ng-universal
npm  run build:ssr
```


## use ngrx

```
npm i -D @ngrx/store
npm i -S @ngrx/effects
```