All possible states of the component

```js
const lqip =
  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAA4DASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUG/8QAIRAAAQQDAAEFAAAAAAAAAAAAAQIDBREABAYhEjEyQVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAE/8QAGBEBAAMBAAAAAAAAAAAAAAAAAQACIRH/2gAMAwEAAhEDEQA/AMJ2DG+7Dw0nz8gsx+uyhlxnWdLakOlfzpIF3aRf1WT5t96P5+N1ug9Tu7ZWS8q1gG6B8H2FDz+YxhjUrEOdZ//Z";

<table>
  <tbody>
    <tr>
      <th />
      <th>Online</th>
      <th>Offline</th>
      <th>No icon</th>
    </tr>
    <tr>
      <th align="left">Initial</th>
      <td>
        <PreciousStateless
          width={3500}
          height={2095}
          lqip={lqip}
          src="andre-spieker-238-unsplash.jpg"
          style={{ maxWidth: 200 }}
          onLine={true}
          mediaState={"initial"}
        />
      </td>
      <td>
        <PreciousStateless
          width={3500}
          height={2095}
          lqip={lqip}
          src="andre-spieker-238-unsplash.jpg"
          style={{ maxWidth: 200 }}
          onLine={false}
          mediaState={"initial"}
        />
      </td>
      <td>
        <PreciousStateless
          width={3500}
          height={2095}
          lqip={lqip}
          src="andre-spieker-238-unsplash.jpg"
          style={{ maxWidth: 200 }}
          onLine={true}
          mediaState={"initial"}
          noIcon={true}
        />
      </td>
    </tr>
    <tr>
      <th align="left">Loading</th>
      <td>
        <PreciousStateless
          width={3500}
          height={2095}
          lqip={lqip}
          src="andre-spieker-238-unsplash.jpg"
          style={{ maxWidth: 200 }}
          onLine={true}
          mediaState={"loading"}
        />
      </td>
      <td>
        <PreciousStateless
          width={3500}
          height={2095}
          lqip={lqip}
          src="andre-spieker-238-unsplash.jpg"
          style={{ maxWidth: 200 }}
          onLine={false}
          mediaState={"loading"}
        />
      </td>
      <td>
        <PreciousStateless
          width={3500}
          height={2095}
          lqip={lqip}
          src="andre-spieker-238-unsplash.jpg"
          style={{ maxWidth: 200 }}
          onLine={true}
          mediaState={"loading"}
          noIcon={true}
        />
      </td>
    </tr>
    <tr>
      <th align="left">Loaded</th>
      <td>
        <PreciousStateless
          width={3500}
          height={2095}
          lqip={lqip}
          src="andre-spieker-238-unsplash.jpg"
          style={{ maxWidth: 200 }}
          onLine={true}
          mediaState={"loaded"}
        />
      </td>
      <td>
        <PreciousStateless
          width={3500}
          height={2095}
          lqip={lqip}
          src="andre-spieker-238-unsplash.jpg"
          style={{ maxWidth: 200 }}
          onLine={false}
          mediaState={"loaded"}
        />
      </td>
      <td>
        <PreciousStateless
          width={3500}
          height={2095}
          lqip={lqip}
          src="andre-spieker-238-unsplash.jpg"
          style={{ maxWidth: 200 }}
          onLine={true}
          mediaState={"loaded"}
          noIcon={true}
        />
      </td>
    </tr>
    <tr>
      <th align="left">Error</th>
      <td>
        <PreciousStateless
          width={3500}
          height={2095}
          lqip={lqip}
          src="andre-spieker-238-unsplash.jpg"
          style={{ maxWidth: 200 }}
          onLine={true}
          mediaState={"error"}
        />
      </td>
      <td>
        <PreciousStateless
          width={3500}
          height={2095}
          lqip={lqip}
          src="andre-spieker-238-unsplash.jpg"
          style={{ maxWidth: 200 }}
          onLine={false}
          mediaState={"error"}
        />
      </td>
      <td>
        <PreciousStateless
          width={3500}
          height={2095}
          lqip={lqip}
          src="andre-spieker-238-unsplash.jpg"
          style={{ maxWidth: 200 }}
          onLine={true}
          mediaState={"error"}
          noIcon={true}
        />
      </td>
    </tr>
  </tbody>
</table>;
```
