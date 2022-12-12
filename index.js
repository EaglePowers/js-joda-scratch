"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const core_1 = require("@js-joda/core");
require("@js-joda/timezone"); // import required for ZoneId.of() call
// LocalDate
const localDate = core_1.LocalDate.parse("2022-12-12"); // could come from an API
assert_1.strict.equal(localDate.month(), core_1.Month.DECEMBER);
assert_1.strict.equal(localDate.dayOfWeek(), core_1.DayOfWeek.MONDAY);
// LocalDateTime
const localDateTime = core_1.LocalDateTime.now();
const localDateTimeInUTCZone = core_1.LocalDateTime.now(core_1.ZoneOffset.UTC);
assert_1.strict.equal(localDateTimeInUTCZone.hour() - 7, localDateTime.hour());
// ZonedDateTime
const zonedDateTimeUTC = core_1.ZonedDateTime.parse("2022-12-12T22:25:00Z"); // could come from an API response
const zonedDateTimeMST = core_1.ZonedDateTime.of(core_1.LocalDateTime.parse("2022-12-12T15:25:00"), // MST is -7 hour offset
core_1.ZoneId.of("America/Denver"));
assert_1.strict.equal(zonedDateTimeUTC.toEpochSecond(), zonedDateTimeMST.toEpochSecond());
// Period (date-based amount)
const futureZonedDateTime = zonedDateTimeUTC.plus(core_1.Period.of(10, 10, 10)); // add 10 years, 10 months, 10 days in the future
assert_1.strict.equal(futureZonedDateTime.toString(), "2033-10-22T22:25Z");
// Duration (time-based amount)
assert_1.strict.equal(core_1.LocalDateTime.parse("2022-12-12T16:25:00")
    .plus(core_1.Duration.ofSeconds(5))
    .toString(), // add 5 seconds
"2022-12-12T16:25:05");
console.log("Tests passed :)");
