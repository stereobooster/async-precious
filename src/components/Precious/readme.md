```js
const lqip =
  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAA4DASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUG/8QAIRAAAQQDAAEFAAAAAAAAAAAAAQIDBREABAYhEjEyQVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAE/8QAGBEBAAMBAAAAAAAAAAAAAAAAAQACIRH/2gAMAwEAAhEDEQA/AMJ2DG+7Dw0nz8gsx+uyhlxnWdLakOlfzpIF3aRf1WT5t96P5+N1ug9Tu7ZWS8q1gG6B8H2FDz+YxhjUrEOdZ//Z";

<table>
  <tbody>
    <tr>
      <th />
      <th>Online</th>
      <th>Offline</th>
    </tr>
    <tr>
      <th align="left">Initial uncontrolled</th>
      <td>
        <Precious
          width={3500}
          height={2095}
          lqip={lqip}
          style={{ maxWidth: 200 }}
          onLine={true}
          src="andre-spieker-238-unsplash.jpg"
        />
      </td>
      <td>
        <Precious
          width={3500}
          height={2095}
          lqip={lqip}
          style={{ maxWidth: 200 }}
          onLine={false}
          src="andre-spieker-238-unsplash.jpg"
        />
      </td>
    </tr>
    <tr>
      <th align="left">Initial "semi-controlled"</th>
      <td>
        <Precious
          width={3500}
          height={2095}
          lqip={lqip}
          style={{ maxWidth: 200 }}
          onLine={true}
          src="andre-spieker-238-unsplash.jpg"
          load={false}
        />
      </td>
      <td>
        <Precious
          width={3500}
          height={2095}
          lqip={lqip}
          style={{ maxWidth: 200 }}
          onLine={false}
          src="andre-spieker-238-unsplash.jpg"
          load={false}
        />
      </td>
    </tr>
    <tr>
      <th align="left">Loading</th>
      <td>❌</td>
      <td>❌</td>
    </tr>
    <tr>
      <th align="left">Loaded</th>
      <td>
        <Precious
          width={3500}
          height={2095}
          lqip={lqip}
          style={{ maxWidth: 200 }}
          onLine={true}
          src="andre-spieker-238-unsplash.jpg"
          load={true}
        />
      </td>
      <td>
        <Precious
          width={3500}
          height={2095}
          lqip={lqip}
          style={{ maxWidth: 200 }}
          onLine={false}
          src={"andre-spieker-238-unsplash.jpg"}
          load={true}
        />
      </td>
    </tr>
    <tr>
      <th align="left">Error</th>
      <td>
        <Precious
          width={3500}
          height={2095}
          lqip={lqip}
          style={{ maxWidth: 200 }}
          onLine={true}
          src="/404.jpg"
          load={true}
        />
      </td>
      <td>
        <Precious
          width={3500}
          height={2095}
          lqip={lqip}
          style={{ maxWidth: 200 }}
          onLine={false}
          src="/404.jpg"
          load={true}
        />
      </td>
    </tr>
  </tbody>
</table>;
```
