# React Offload UI Thread Research

When we develop a frontend application, we undoubtedly offload all kinds of I/O,
computational tasks from UI thread to prevent UI thread is too busy and become
unresponsive. However, this rule doesn't apply to current web development.

### 120Hz is coming

120Hz Web browsing is coming, the higher fps the shorter time for UI thread to process.
Consider the 60Hz to 120Hz change, the "smooth UI" process cycle time changed from 16.67ms
to 8.33ms, that halve the time we got from previous decade!

> An I/O call is non-blocking on UI thread doesn't mean that it doesn't use the UI thread
> CPU time.

In addition, the business requirements and transition animations also become more and more
complex. If you need to build a smooth Web application, using a web worker is unavoidable.

### Painful and Time-consuming web worker development

Most of the time we work on a Web frontend developments, we are tempted to do everything
on UI thread like:

- calling fragmented REST call and then **aggregate together**
- calling a large GraphQL query and then apply **data transformation**, array sorting and
  filtering...etc.

It is because:

- creating a web-worker and bundle some existing npm modules into it is **painful**.
- coding in a complete message driven style is **buggy and time-consuming**.
- working in an async UI pattern requires more state to handle it.

### Upcoming Possibility

As the [ComLink abstraction](https://github.com/GoogleChromeLabs/comlink)(turn a web
worker to RPC-style function call) and
[React Concurrent mode](https://reactjs.org/docs/concurrent-mode-intro.html) arise. I
think it is time to start thinking to adopt web worker **_in all cases_** - completely
decouple a data accessing layer that completely use browser's background thread for
**ALL** I/O and data processing and then return to the UI thread.

Nothing is new, this was how we wrote a standard frontend application in other
platforms(iOS, Android, Windows, macOS, JVM) since multi-threaded CPU appeared.

This project is a
[Comlink loader (Webpack)](https://github.com/GoogleChromeLabs/comlink-loader) decision
research.

To access the complete research findings, you could access in
[patreon](https://www.patreon.com/gaplotech).

## Getting Started

[![Edit gaplo917/react-offload-ui-thread-research](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/gaplo917/react-offload-ui-thread-research/tree/master/?fontsize=14&hidenavigation=1)

or try locally

```
git clone https://github.com/gaplo917/react-offload-ui-thread-research.git

cd react-offload-ui-thread-research
yarn intall

# start the demo
yarn start
```