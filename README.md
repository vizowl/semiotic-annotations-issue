# Semiotic Annotation Issue

I cannot get Semiotic to change re-render the annotation note title when the underlying value changes.

I have pulled out minimal version of the issue in this repo.

I have tested the repo on OS X using [parcel](https://parceljs.org/). So just cloning the repo and running
`parcel index.html` should be sufficient.

## The issue

When you select a region other than _Queenstown-Lakes_ the annotion title should change from _-7.7%_. This change happens
in the text above the chart and the new values get passed to the `area` annotation.
